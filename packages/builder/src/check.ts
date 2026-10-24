/**
 * The checks that flattening keeps what renders, with Kirana as the judge (`kirana-style trace`):
 *
 * - **Round trip.** Each module, evaluated and written back unflattened, must rank every property's
 *   entries exactly as its source does. This is what makes the evaluated module (`evaluate.ts`)
 *   trustworthy for the next check.
 * - **Winners.** For every combination, every style object whose properties name a style or a base
 *   state (each `css()`, each nested style, each recipe's variants), the flattened entries must
 *   pick the same winner as the live ones in every combination of the conditions that remain
 *   (`winners.ts`).
 *
 * Both write their modules into `registry/.flat/`, so Kirana compiles them with the registry's
 * configuration, and remove it after.
 */
import { spawnSync } from "node:child_process"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import type { Classify } from "./flatten"
import { flattenHandle, flattenRecipe } from "./flatten"
import type { Generated, Names } from "./generate"
import { generate } from "./generate"
import type { Combination } from "./items"
import type { RecipeHandle, StyleHandle, StyleObject } from "./kirana-stub"
import { only } from "./markers"
import { entriesOf, isNestedStyleKey, mergeStyles } from "./styles"
import { pooled, trace } from "./trace"
import type { Exclusive } from "./winners"
import { compareWinners, sameAttribute, styleOf } from "./winners"

const isObject = (value: unknown): value is StyleObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

/** Every `css()` handle in a module's exports, by its path (`dialog.content`). */
export function handlesOf(exports: Record<string, unknown>) {
  const handles = new Map<string, StyleHandle>()
  const walk = (value: unknown, path: string) => {
    if (isObject(value) && value.kind === "style")
      handles.set(path, value as StyleHandle)
    else if (
      isObject(value) &&
      value.kind !== "recipe" &&
      typeof value.within !== "function"
    ) {
      for (const [key, member] of Object.entries(value))
        walk(member, `${path}.${key}`)
    }
  }
  for (const [name, value] of Object.entries(exports)) walk(value, name)
  return handles
}

/** A handle's properties written on the element itself (not nested styles). */
const ownProperties = (style: StyleObject) =>
  Object.keys(style).filter(
    (key) => !isNestedStyleKey(key) && !key.includes("")
  )

/**
 * A style object the check compares: `live` as the site merges it, `flat` as the installed module
 * merges it, from the flattener's own output (a recipe's flattened base and variant, merged).
 */
export type Probe = {
  live: StyleObject
  flat: (classify: Classify) => StyleObject
}

type RecipeConfig = {
  base?: StyleObject
  variants?: Record<string, Record<string, StyleObject>>
}

const ownStyle = (style: StyleObject) =>
  Object.fromEntries(
    Object.entries(style).filter(([key]) => !isNestedStyleKey(key))
  )

/** The style objects worth probing: each handle's own, its nested styles, each recipe variant. */
export function probesOf(exports: Record<string, unknown>) {
  const probes = new Map<string, Probe>()
  const add = (
    path: string,
    live: StyleObject,
    flat: (classify: Classify) => StyleObject
  ) => {
    probes.set(path, {
      live: ownStyle(live),
      flat: (classify) => ownStyle(flat(classify)),
    })
    for (const [key, nested] of Object.entries(live)) {
      if (isNestedStyleKey(key) && isObject(nested))
        add(`${path} ${key}`, nested, (classify) => {
          const value = flat(classify)[key]
          return isObject(value) ? value : {}
        })
    }
  }
  for (const [path, h] of handlesOf(exports)) {
    add(path, h.styles.reduce(mergeStyles, {} as StyleObject), (classify) =>
      flattenHandle(h, classify).styles.reduce(mergeStyles, {} as StyleObject)
    )
  }
  for (const [name, value] of Object.entries(exports)) {
    if (!isObject(value) || value.kind !== "recipe") continue
    const recipe = value as RecipeHandle
    const config = recipe.config as RecipeConfig
    const flattened = new Map<Classify, RecipeConfig>()
    const flatConfig = (classify: Classify) => {
      if (!flattened.has(classify))
        flattened.set(
          classify,
          flattenRecipe(recipe, classify).config as RecipeConfig
        )
      return flattened.get(classify)!
    }
    // The base and its variants as the site and the installed module merge them: one variant, then
    // one of each of two groups (a style's override in one group can meet a state in another).
    const probe = (choices: [string, string][]) =>
      add(
        `${name}[${choices.map(([group, option]) => `${group}=${option}`).join(",")}]`,
        choices.reduce(
          (style, [group, option]) =>
            mergeStyles(style, config.variants![group][option]),
          config.base ?? {}
        ),
        (classify) => {
          const flat = flatConfig(classify)
          return choices.reduce(
            (style, [group, option]) =>
              mergeStyles(style, flat.variants![group][option]),
            flat.base ?? {}
          )
        }
      )
    const groups = Object.entries(config.variants ?? {})
    for (const [group, options] of groups) {
      for (const option of Object.keys(options)) probe([[group, option]])
    }
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        for (const a of Object.keys(groups[i][1])) {
          for (const b of Object.keys(groups[j][1])) {
            probe([
              [groups[i][0], a],
              [groups[j][0], b],
            ])
          }
        }
      }
    }
  }
  return probes
}

export type CheckContext = {
  registry: string
  cli: string
  names: Names
  concurrency: number
}

function write(context: CheckContext, path: string, generated: Generated) {
  const file = join(context.registry, ".flat", path)
  mkdirSync(join(file, ".."), { recursive: true })
  writeFileSync(file, generated.code)
  return `.flat/${path}`
}

/** The check's modules read every relation from the registry's own sources, beside them. */
const fromSources = (module: string) => ({
  specifier: `../../styles/${module.replace(/\.ts$/, "")}`,
  own: true,
})

const handle = (style: StyleObject): StyleHandle => ({
  kind: "style",
  anchors: [],
  styles: [style],
  site: { file: "", line: 0 },
})

/** Each module's evaluated exports against its source, property by property. */
export async function roundTrip(
  context: CheckContext,
  modules: Map<string, Record<string, unknown>>
): Promise<{ problems: string[]; compared: number }> {
  const tasks: (() => Promise<string | undefined>)[] = []
  for (const [module, exports] of modules) {
    const generated = generate(exports, context.names, {
      flatten: (h) => h,
      flattenRecipe: (h) => h,
      imports: (core) => `../../core/${core}`,
      header:
        "// The builder's round trip: this module, evaluated and written back.",
      module,
      relationsFrom: fromSources,
    })
    const file = write(context, `round-trip/${module}`, generated)
    for (const [path, h] of handlesOf(exports)) {
      const style = h.styles.reduce(mergeStyles, {} as StyleObject)
      const source = h.site.file.slice(context.registry.length + 1)
      for (const property of ownProperties(style)) {
        tasks.push(async () => {
          const [before, after] = await Promise.all([
            trace(context.cli, context.registry, source, h.site.line, property),
            trace(
              context.cli,
              context.registry,
              file,
              generated.sites.get(path)!,
              property
            ),
          ])
          return JSON.stringify(before) === JSON.stringify(after)
            ? undefined
            : `${module} ${path} ${property}: the evaluated module ranks its entries differently from the source.`
        })
      }
    }
  }
  const results = await pooled(tasks, context.concurrency)
  return {
    problems: results.filter((p) => p !== undefined),
    compared: results.length,
  }
}

/** The flattened probes of a module against the live ones, for every combination. */
export async function checkWinners(
  context: CheckContext,
  module: string,
  exports: Record<string, unknown>,
  combinations: Combination[],
  classifyFor: (combination: Combination) => Classify,
  exclusive: Exclusive
): Promise<{ problems: string[]; compared: number }> {
  const probes = probesOf(exports)
  // Only a property under a style's condition or a base's state key can change.
  const changed = new Map<string, string[]>()
  for (const [path, { live: style }] of probes) {
    const properties = ownProperties(style).filter((property) =>
      entriesOf(style[property]).some((entry) => entry.path.some(flattens))
    )
    if (properties.length) changed.set(path, properties)
  }
  if (changed.size === 0) return { problems: [], compared: 0 }

  const ids = [...changed.keys()]
  const probeExports = (map: (style: StyleObject) => StyleObject) =>
    Object.fromEntries(
      ids.map((path, index) => [
        `p${index}`,
        handle(map(probes.get(path)!.live)),
      ])
    )
  const options = (header: string) => ({
    flatten: (h: StyleHandle) => h,
    flattenRecipe: (h: RecipeHandle) => h,
    imports: (core: string) => `../../core/${core}`,
    header,
    module,
    relationsFrom: fromSources,
  })
  const live = generate(
    probeExports((s) => s),
    context.names,
    options("// Live probes.")
  )
  const liveFile = write(context, `before/${module}`, live)

  const tasks: (() => Promise<string[]>)[] = []
  const liveRanks = new Map<string, ReturnType<typeof trace>>()
  const liveRank = (index: number, property: string) => {
    const key = `${index} ${property}`
    if (!liveRanks.has(key)) {
      liveRanks.set(
        key,
        trace(
          context.cli,
          context.registry,
          liveFile,
          live.sites.get(`p${index}`)!,
          property
        )
      )
    }
    return liveRanks.get(key)!
  }

  // Every combination's flattened probes, each distinct one traced once: a style object that
  // flattens alike for two combinations (one style on two bases, say) is the same module text.
  const unique = new Map<string, { style: StyleObject; key: string }>()
  const flatOf = new Map<string, string>()
  for (const combination of combinations) {
    const classify = classifyFor(combination)
    ids.forEach((path) => {
      const style = probes.get(path)!.flat(classify)
      const text = JSON.stringify(style)
      if (!unique.has(text)) unique.set(text, { style, key: `f${unique.size}` })
      flatOf.set(`${combination.id} ${path}`, unique.get(text)!.key)
    })
  }
  const flat = generate(
    Object.fromEntries(
      [...unique.values()].map(({ style, key }) => [key, handle(style)])
    ),
    context.names,
    options("// Flattened probes, each distinct one once.")
  )
  const flatFile = write(context, `after/${module}`, flat)
  const flatRanks = new Map<string, ReturnType<typeof trace>>()
  const flatRank = (key: string, property: string) => {
    const id = `${key} ${property}`
    if (!flatRanks.has(id)) {
      flatRanks.set(
        id,
        trace(
          context.cli,
          context.registry,
          flatFile,
          flat.sites.get(key)!,
          property
        )
      )
    }
    return flatRanks.get(id)!
  }

  for (const combination of combinations) {
    ids.forEach((path, index) => {
      const foreign = foreignTexts(probes.get(path)!.live, combination)
      const key = flatOf.get(`${combination.id} ${path}`)!
      for (const property of changed.get(path)!) {
        tasks.push(async () => {
          const [before, after] = await Promise.all([
            liveRank(index, property),
            flatRank(key, property),
          ])
          const fixed = (condition: string) => {
            const style = styleOf(condition)
            if (style) return style === combination.style
            return foreign.has(condition) ? false : undefined
          }
          return compareWinners(before, after, fixed, exclusive).map(
            (m) =>
              `${combination.id} ${module} ${path} ${property}: with ${m.holding.join(" & ") || "nothing"}, ${m.before} live but ${m.after} flattened.`
          )
        })
      }
    })
  }
  const results = await pooled(tasks, context.concurrency)
  return { problems: results.flat(), compared: results.length }
}

/** A style's condition or a base's state key: what flattening removes or keeps. */
function flattens(condition: string) {
  const marker = only(condition)
  return (
    marker?.kind === "state" ||
    (marker?.kind === "read" &&
      marker.relation === "ui" &&
      marker.condition.startsWith("[data-style="))
  )
}

/**
 * The conditions, as Kirana prints them, that never hold on the target: keys only another base
 * writes in this style object. A text the target's base also writes, or that the object uses as a
 * plain condition, is left free (both sides then keep it).
 */
function foreignTexts(style: StyleObject, combination: Combination) {
  const others = new Set<string>()
  const own = new Set<string>()
  const conditions = Object.values(style).flatMap((value) =>
    entriesOf(value).flatMap((entry) => entry.path)
  )
  for (const condition of conditions) {
    const marker = only(condition)
    if (marker?.kind === "state")
      (marker.base === combination.base ? own : others).add(marker.key)
    else own.add(condition)
  }
  return new Set([...others].filter((text) => !own.has(text)))
}

/**
 * Two conditions one element never holds together, as Kirana reads the configuration:
 * `conditions.exclusive`'s pairs; `conditions.exclusiveAcross`' vocabularies, where two conditions
 * each named by a vocabulary and held together by none are exclusive; and one attribute with two
 * values.
 */
export function exclusiveFrom(
  pairs: string[][],
  across: string[][] = []
): Exclusive {
  const set = new Set(
    pairs.flatMap((pair) =>
      pair.flatMap((a) =>
        pair.filter((b) => b !== a).map((b) => `${a}\u0000${b}`)
      )
    )
  )
  const vocabularies = across.map((vocabulary) => new Set(vocabulary))
  const named = (condition: string) =>
    vocabularies.some((vocabulary) => vocabulary.has(condition))
  const apart = (a: string, b: string) =>
    named(a) &&
    named(b) &&
    !vocabularies.some((vocabulary) => vocabulary.has(a) && vocabulary.has(b))
  return (a, b) =>
    sameAttribute(a, b) || set.has(`${a}\u0000${b}`) || apart(a, b)
}

/**
 * Every module the checks wrote, compiled by Kirana: a module the generator wrote wrong (a name
 * that shadows Kirana's, a key it cannot read) is an error there even where no trace looks.
 */
export function compileGenerated(context: CheckContext): string[] {
  const result = spawnSync(context.cli, ["check", ".flat"], {
    cwd: context.registry,
    encoding: "utf8",
  })
  const output = `${result.stdout}${result.stderr}`
  const errors = output
    .split("\n")
    .filter((line) => /^(error|warning)\[/.test(line))
  return errors.length
    ? [`The generated modules do not compile cleanly:\n${output}`]
    : []
}

export function clean(registry: string) {
  rmSync(join(registry, ".flat"), { recursive: true, force: true })
}

export { flattenHandle }
