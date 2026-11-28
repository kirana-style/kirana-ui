/**
 * The design system as a project installs it (the `kirana` item): the registry's `core/` modules
 * serve the site, every framework and base at once, and a project has one of each. So what a
 * project installs is written here from them, for its base:
 *
 * - `kirana.ts`, the configuration `kirana.config.ts` spreads, with the state vocabulary of the
 *   project's base alone and the pairs of states its installed code can meet (`kiranaModule`);
 * - `config.ts` with the constants the installed files read, not the site's every list
 *   (`configModule`);
 * - markup that reads a state through `when()` (a sidebar block's separator) written with the
 *   base's key, so no installed file needs `states.ts` (`withoutStates`).
 *
 * Only a project installed with every design (`ui init --all-designs`) keeps `states.ts` and the
 * whole `kirana.ts`: its style modules travel as written, every base's keys in them.
 */
import { createRequire } from "node:module"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

import * as config from "../../../registry/core/config"
import { installConfig, registryConfig } from "../../../registry/core/kirana"
import * as states from "../../../registry/core/states"
import type { Base } from "./flatten"
import { classifier } from "./flatten"
import { generatedLiteral, stringOf } from "./literal"
import { marker, only, plainStates } from "./markers"

const REGISTRY = join(import.meta.dirname, "..", "..", "..", "registry")

/** The state vocabularies each base's components write, as `@kirana-style/states/<name>`. */
export const VOCABULARIES: Record<Base, readonly string[]> = {
  base: ["base-ui"],
  aria: ["react-aria"],
  ark: ["ark-ui"],
  // ng-primitives write Base UI's attribute names nearly everywhere (`states.ts`).
  ng: ["base-ui"],
  reka: ["reka-ui"],
  bits: ["bits-ui"],
  uisdk: ["ui-sdk"],
  // Kirana UI Primitives write Base UI's vocabulary, with keys of their own.
  kirana: ["kirana-ui", "base-ui"],
}

/** The namespace each vocabulary is imported as. */
const NAMESPACES: Record<string, string> = {
  "base-ui": "Base",
  "react-aria": "Aria",
  "ark-ui": "Ark",
  "reka-ui": "Reka",
  "bits-ui": "Bits",
  "ui-sdk": "UiSdk",
  "kirana-ui": "KiranaUi",
}

/** The registry's own copy of `@kirana-style/states`, which the builder does not depend on. */
const resolveFromRegistry = createRequire(join(REGISTRY, "package.json"))
const vocabularyPairs = new Map<string, readonly (readonly string[])[]>(
  await Promise.all(
    Object.keys(NAMESPACES).map(async (name) => {
      const module = (await import(
        pathToFileURL(
          resolveFromRegistry.resolve(`@kirana-style/states/${name}`)
        ).href
      )) as { exclusive?: readonly (readonly string[])[] }
      return [name, module.exclusive ?? []] as const
    })
  )
)

const pairKey = (pair: readonly string[]) => JSON.stringify(pair)

/**
 * The pairs `registryConfig` adds to the vocabularies' own: written in `core/kirana.ts` (a
 * separator's `aria-orientation`, a calendar day's range, a popup's placement), as plain selectors.
 */
export function ownPairs(): string[][] {
  const fromVocabularies = new Set(
    [...vocabularyPairs.values()].flat().map(pairKey)
  )
  return registryConfig.conditions.exclusive
    .map((pair) => (pair as readonly string[]).map(plainStates))
    .filter((pair) => !fromVocabularies.has(pairKey(pair)))
}

/**
 * The installed `kirana.ts` for a base: its vocabularies' exclusive pairs, what its installed
 * code writes of another vocabulary's, and those of the registry's own pairs whose every selector
 * the base's installed code (`code`, its flattened style
 * modules and its markup) writes; a pair it can never meet is left out. No `exclusiveAcross`: a
 * project's components are all on its one base.
 */
export function kiranaModule(base: Base, code: string): string {
  const vocabularies = VOCABULARIES[base]
  const own = new Set(
    vocabularies.flatMap((name) =>
      (vocabularyPairs.get(name) ?? []).map(pairKey)
    )
  )
  // A part may write another vocabulary's attribute itself (a Reka UI navigation menu moving with
  // `data-starting-style`): that vocabulary's group, cut to the selectors the base's code writes.
  const borrowed = new Map<string, string[]>()
  for (const [name, groups] of vocabularyPairs) {
    if (vocabularies.includes(name)) continue
    for (const group of groups) {
      const written = group.filter((selector) => code.includes(selector))
      if (written.length >= 2 && !own.has(pairKey(written)))
        borrowed.set(pairKey(written), written)
    }
  }
  const pairs = [
    ...borrowed.values(),
    ...ownPairs().filter((pair) =>
      pair.every((selector) => code.includes(selector))
    ),
  ]
  const imports = vocabularies
    .map(
      (name) =>
        `import * as ${NAMESPACES[name]} from "@kirana-style/states/${name}"`
    )
    .join("\n")
  const spreads = vocabularies.map(
    (name) => `...${NAMESPACES[name]}.exclusive,`
  )
  const exclusive = [
    ...spreads,
    ...pairs.map((pair) => `${generatedLiteral(pair, 3)},`),
  ]
    .map((line) => `      ${line}`)
    .join("\n")
  return `${imports}
import type { KiranaConfig } from "@kirana-style/core/config"

/** The states that never hold together on one element, which Kirana reads so their rules do not compete. */
export const registryConfig = {
  conditions: {
    exclusive: [
${exclusive}
    ],
  },
} satisfies KiranaConfig

/** \`registryConfig\` with the reset and typeset layers under every Kirana rule: what \`kirana.config.ts\` spreads. */
export const installConfig = {
  ...registryConfig,
  layers: ${generatedLiteral(installConfig.layers, 1)},
} satisfies KiranaConfig
`
}

/** The names a file imports from a module, values and types apart. */
export type Imported = { values: Set<string>; types: Set<string> }

const IMPORT = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g

/** What `content` imports from a specifier that `matches`, added to `into`. */
export function importsFrom(
  content: string,
  matches: (specifier: string) => boolean,
  into: Imported = { values: new Set(), types: new Set() }
): Imported {
  for (const [, typeOnly, names, specifier] of content.matchAll(IMPORT)) {
    if (!matches(specifier!)) continue
    for (const raw of names!.split(",")) {
      const entry = raw.trim()
      if (!entry) continue
      const isType = Boolean(typeOnly) || entry.startsWith("type ")
      const name = entry
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)[0]!
        .trim()
      ;(isType ? into.types : into.values).add(name)
    }
  }
  return into
}

/** The types of `config.ts` a project can read, as the lists they are made of. */
const TYPES: Record<string, () => readonly string[]> = {
  Axis: () => Object.keys(config.AXES),
  Framework: () => config.FRAMEWORKS,
  Base: () => config.BASES,
  Style: () => config.STYLES,
  BaseColor: () => config.BASE_COLORS,
  Theme: () => config.THEMES,
  ChartColor: () => config.CHART_COLORS,
  IconLibrary: () => config.ICON_LIBRARIES,
  Font: () => config.FONTS,
  FontHeading: () => config.FONT_HEADINGS,
  Radius: () => config.RADII,
  MenuColor: () => config.MENU_COLORS,
  MenuAccent: () => config.MENU_ACCENTS,
}

/**
 * The installed `config.ts`: the constants and types of the registry's `core/config.ts` that the
 * installed files import, each written out, in the source's order. A name it cannot write (a
 * function) is a problem.
 */
export function configModule(imported: Imported, problems: string[]): string {
  const exports = config as Record<string, unknown>
  const lines: string[] = []
  for (const name of [...imported.types].sort()) {
    const list = TYPES[name]
    if (!list) {
      problems.push(
        `config.ts: an installed file imports the type ${name}, which the builder cannot write out`
      )
      continue
    }
    lines.push(
      `export type ${name} = ${list()
        .map((value) => JSON.stringify(value))
        .join(" | ")}`
    )
  }
  for (const name of Object.keys(exports)) {
    if (!imported.values.has(name)) continue
    const value = exports[name]
    if (typeof value === "function" || value === undefined) {
      problems.push(
        `config.ts: an installed file imports ${name}, which the builder cannot write out`
      )
      continue
    }
    lines.push(`export const ${name} = ${generatedLiteral(value, 0)} as const`)
  }
  for (const name of imported.values)
    if (!(name in exports))
      problems.push(
        `config.ts: an installed file imports ${name}, which it lacks`
      )
  return `${lines.join("\n\n")}\n`
}

const STATES_IMPORT =
  /^[ \t]*import\s*\{([^}]*)\}\s*from\s*["']@\/registry\/lib\/kirana\/states["'];?[ \t]*\r?\n/m

/** Each key `base` writes for a state, as a flattened module keeps it (`flatten.ts`'s classifier). */
export function keysFor(state: Record<string, unknown>, base: Base): string[] {
  const classify = classifier({ style: "", base })
  return Object.entries(state).flatMap(([keyed, value]) => {
    if (typeof value !== "string") return []
    const tagged =
      only(value)?.kind === "state"
        ? value
        : marker({ kind: "state", base: keyed as Base, key: value })
    return classify(tagged) === "keep" ? [plainStates(tagged)] : []
  })
}

/** The end of the call opened before `from`: the index of its closing parenthesis. */
function closing(text: string, from: number): number {
  let depth = 0
  for (let at = from; at < text.length; at++) {
    const char = text[at]
    if (char === "(" || char === "[" || char === "{") depth++
    else if (char === ")" || char === "]" || char === "}") {
      if (depth === 0) return at
      depth--
    } else if (char === '"' || char === "'" || char === "`") {
      const end = text.indexOf(char, at + 1)
      if (end < 0) return -1
      at = end
    }
  }
  return -1
}

/**
 * Markup that reads states from `states.ts` (`{ ...when(orientation.vertical, "auto") }`), written
 * for one base: each `when()` as the keys the base writes, and the import gone. Anything else it
 * reads from `states.ts` is a problem, since the project has no such module.
 */
export function withoutStates(
  file: string,
  content: string,
  base: Base,
  problems: string[]
): string {
  const found = STATES_IMPORT.exec(content)
  if (!found) return content
  const locals = new Map<string, string>()
  for (const raw of found[1]!.split(",")) {
    const entry = raw.trim()
    if (!entry) continue
    const [name, local = name] = entry
      .split(/\s+as\s+/)
      .map((part) => part.trim())
    locals.set(local!, name!)
  }
  const whenName = [...locals].find(([, name]) => name === "when")?.[0]
  let text =
    content.slice(0, found.index) + content.slice(found.index + found[0].length)
  if (whenName) {
    const call = new RegExp(
      `(\\.\\.\\.)?\\b${whenName}\\(\\s*(\\w+)\\.(\\w+)\\s*,\\s*`,
      "g"
    )
    let out = ""
    let last = 0
    for (let match = call.exec(text); match; match = call.exec(text)) {
      const [whole, spread, local, key] = match
      const group = locals.get(local!)
      const state = group
        ? (
            (states as Record<string, unknown>)[group] as
              | Record<string, unknown>
              | undefined
          )?.[key!]
        : undefined
      const end = closing(text, match.index + whole.length)
      if (!state || typeof state !== "object" || end < 0) {
        problems.push(`${file}: cannot write ${whole.trim()}…) for ${base}`)
        continue
      }
      const value = text
        .slice(match.index + whole.length, end)
        .trim()
        .replace(/,$/, "")
      const entries = keysFor(state as Record<string, unknown>, base).map(
        (selector) => `${stringOf(selector)}: ${value}`
      )
      out += text.slice(last, match.index)
      out += spread ? entries.join(", ") : `{ ${entries.join(", ")} }`
      last = end + 1
      call.lastIndex = last
    }
    text = out + text.slice(last)
  }
  // A read is a call or a member (`orientation.vertical`); `orientation="vertical"` is a prop.
  for (const [local, name] of locals)
    if (new RegExp(`\\b${local}${name === "when" ? "\\(" : "\\."}`).test(text))
      problems.push(
        `${file}: reads ${local} from states.ts, which a project does not install`
      )
  return text
}
