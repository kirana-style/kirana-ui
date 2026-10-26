/**
 * The registry in Kirana's own format, which `kirana-style ui` reads: one item per component for
 * every framework and base (`/r/<item>.json`) and the index of them all (`/r/index.json`).
 *
 * An item's style modules travel as written, one source for every framework, since installation
 * flattens them for the project's design. Its markup travels per framework and base, and the files
 * every base shares once. A file names another installed file by its type and path, as the item
 * lists it: `@/registry/<type>/<path>` (`@/registry/lib/kirana/axes`, `@/registry/component/login-form`),
 * which installation rewrites to the project's alias for the type; two files installed in one folder
 * keep a relative import.
 */
import { readFileSync } from "node:fs"
import { join } from "node:path"

import { hashOf } from "@kirana-style/registry"

import { AXIS_ATTRIBUTES } from "../../../registry/core/attributes"
import { AXES } from "../../../registry/core/config"
import { LAYOUTS } from "../../../registry/core/preset"
import type { Combination, Framework, Item } from "./items"
import { COMBINATIONS, ITEMS, installedPath } from "./items"
import type { BuiltFile } from "./registry"
import { dependenciesOf, ownersOf, rewriteImports, sourcesOf } from "./registry"

export const KIRANA_ITEM = "https://kirana.style/schema/registry-item.json"
export const KIRANA_INDEX = "https://kirana.style/schema/registry-index.json"

/** How a project installs a file: under its alias for `type`, at `path`. */
export type KiranaFile = {
  path: string
  type: "ui" | "lib" | "component"
  content: string
  hash: string
}

type Packages = Record<string, string>
type Bases = Record<
  string,
  {
    files: KiranaFile[]
    dependencies?: Packages
    registryDependencies?: string[]
  }
>

/** A design system's axes and preset layouts, as `kirana-style ui preset` reads them (D-110). */
export type KiranaDesign = {
  axes: Record<string, { attribute: string; values: string[] }>
  flatten: string
  presets: Record<string, { axis: string; values: string[]; bits: number }[]>
}

/**
 * The design system's description: every axis written to `<html>` with its values (the first the
 * default), `style` the axis the builder flattens for, and the preset layouts the site's codes use.
 * shadcn/ui's `a` codes also carried a theme's charts, which the installer does not decode.
 */
export function designOf(): KiranaDesign {
  return {
    axes: Object.fromEntries(
      Object.entries(AXIS_ATTRIBUTES).map(([axis, attribute]) => [
        axis,
        { attribute, values: [...AXES[axis as keyof typeof AXES]] },
      ])
    ),
    flatten: "style",
    presets: Object.fromEntries(
      Object.entries(LAYOUTS).map(([letter, fields]) => [
        letter,
        fields.map((field) => ({
          axis: field.key,
          values: [...field.values],
          bits: field.bits,
        })),
      ])
    ),
  }
}

export type KiranaItem = {
  $schema: string
  name: string
  type: "component" | "block" | "lib" | "design-system"
  version: string
  title: string
  description: string
  kirana: string
  registryDependencies?: string[]
  dependencies?: Packages
  axes?: string[]
  styles?: KiranaFile[]
  frameworks?: Partial<Record<Framework, Bases>>
  files?: KiranaFile[]
  design?: KiranaDesign
  flattened?: {
    axis: string
    builds: Record<string, Record<string, KiranaFile[]>>
  }
  setup?: Item["setup"]
}

export type KiranaIndex = {
  $schema: string
  name: string
  homepage: string
  items: (Pick<
    KiranaItem,
    "name" | "type" | "title" | "description" | "version"
  > & { frameworks?: Partial<Record<Framework, string[]>> })[]
}

/** An import of `components/` or `blocks/`, which Kirana's format names as the type `component`. */
const COMPONENT_IMPORT = /(["'])@\/registry\/(components|blocks)\//g

/** A file as Kirana's format places it: `ui/x` under `ui`, `lib/x` under `lib`, the rest under `component`. */
export function kiranaFile(file: BuiltFile): KiranaFile {
  const [, folder, rest] =
    /^(ui|lib|components)\/(.+)$/.exec(file.installed) ?? []
  const place =
    folder === "ui"
      ? { type: "ui" as const, path: rest! }
      : folder === "lib"
        ? { type: "lib" as const, path: rest! }
        : { type: "component" as const, path: rest ?? file.installed }
  const content = file.content.replace(
    COMPONENT_IMPORT,
    (_, quote: string, imported: string) =>
      `${quote}@/registry/component/${imported === "blocks" ? "blocks/" : ""}`
  )
  return { ...place, content, hash: hashOf(content) }
}

/** The item's kind in Kirana's format: the design system, a block, a library (style modules alone are one), or a component. */
function kindOf(item: Item): KiranaItem["type"] {
  if (item.name === "kirana") return "design-system"
  if (item.type === "registry:block") return "block"
  if (item.type === "registry:lib" || item.name.endsWith("-styles"))
    return "lib"
  return "component"
}

/** The design axes a style module reads (`axes.style.vega` reads `style`). */
export const axesOf = (code: string) =>
  [
    ...new Set([...code.matchAll(/\baxes\.(\w+)/g)].map((match) => match[1]!)),
  ].sort()

const baseKey = (combination: Combination) =>
  `${combination.framework}/${combination.base}`

/** One combination per framework and base: the markup is the same in every style. */
const BASES = [
  ...new Map(
    COMBINATIONS.map((combination) => [baseKey(combination), combination])
  ).values(),
]

/** Packages present with the same range in every list. */
function common(lists: readonly Map<string, string>[]): Packages {
  const [first, ...rest] = lists
  return Object.fromEntries(
    [...(first ?? [])].filter(([name, range]) =>
      rest.every((list) => list.get(name) === range)
    )
  )
}

/**
 * Every item in Kirana's format, and the index. `versions` gives each package's range, `version` the
 * items' version and `kirana` the Kirana release they were built and checked with.
 */
export function buildKiranaRegistry(
  registry: string,
  versions: (name: string) => string | undefined,
  version: string,
  kirana: string,
  /** A style module as the builder flattened and checked it for a combination, if it did. */
  flattenedOf: (
    combination: Combination,
    module: string
  ) => string | undefined = () => undefined
) {
  const problems: string[] = []
  const read = (combination: Combination, source: string): BuiltFile => ({
    source,
    installed: installedPath(source),
    content: rewriteImports(
      registry,
      source,
      readFileSync(join(registry, source), "utf8"),
      combination,
      "@/registry"
    ),
  })

  // Each item's files for each framework and base.
  const perBase = new Map<Item, Map<string, BuiltFile[]>>()
  for (const item of ITEMS) {
    const bases = new Map<string, BuiltFile[]>()
    for (const combination of BASES) {
      const sources = sourcesOf(registry, item, combination)
      if (sources)
        bases.set(
          baseKey(combination),
          sources.map((source) => read(combination, source))
        )
    }
    perBase.set(item, bases)
  }
  const owner = new Map<string, string>()
  for (const [item, bases] of perBase)
    ownersOf(
      [...bases.values()].map((files): [Item, BuiltFile[]] => [item, files]),
      owner
    )

  const items: KiranaItem[] = []
  for (const [item, bases] of perBase) {
    const all = [...bases.values()]
    // Style modules travel as written; a stylesheet beside them (the reset) is a plain file.
    const isStyle = (file: BuiltFile) =>
      file.source.startsWith("styles/") && file.source.endsWith(".ts")
    const styles = (all[0] ?? []).filter(isStyle)
    // Files every framework and base installs alike, when the item is for all of them.
    const everywhere = bases.size === BASES.length
    const shared = everywhere
      ? (all[0] ?? []).filter(
          (file) =>
            !isStyle(file) &&
            all.every((files) =>
              files.some(
                (other) =>
                  other.installed === file.installed &&
                  other.content === file.content
              )
            )
        )
      : []
    const own = new Map(
      [...bases].map(([key, files]) => [
        key,
        files.filter(
          (file) =>
            !isStyle(file) &&
            !shared.some((alike) => alike.installed === file.installed)
        ),
      ])
    )
    const withMarkup = [...own.values()].filter((files) => files.length > 0)
    if (withMarkup.length > 0 && withMarkup.length < own.size)
      problems.push(
        `${item.name}: some bases have files of their own and others none, which Kirana's format cannot say.`
      )
    const listsBases = withMarkup.length > 0

    // Dependencies per base, from everything that base installs.
    const found = [...bases].map(([key, files]) => {
      const result = dependenciesOf(
        files,
        item.name,
        owner,
        "@/registry",
        versions
      )
      problems.push(...result.problems.map((problem) => `${key}: ${problem}`))
      return { key, ...result }
    })
    // What every base needs is the item's; the rest, each base's own.
    const registryDependencies = (found[0]?.registryDependencies ?? []).filter(
      (name) =>
        found.every((entry) => entry.registryDependencies.includes(name))
    )
    if (
      !listsBases &&
      found.some(
        (entry) =>
          entry.registryDependencies.length !== registryDependencies.length
      )
    )
      problems.push(
        `${item.name}: its bases depend on different items but share every file, which Kirana's format cannot say.`
      )
    const dependencies = common(found.map((entry) => entry.dependencies))

    const frameworks: Partial<Record<Framework, Bases>> = {}
    if (listsBases)
      for (const entry of found) {
        const [framework, base] = entry.key.split("/") as [Framework, string]
        const packages = Object.fromEntries(
          [...entry.dependencies].filter(([name]) => !(name in dependencies))
        )
        const needs = entry.registryDependencies.filter(
          (name) => !registryDependencies.includes(name)
        )
        ;(frameworks[framework] ??= {})[base] = {
          files: own.get(entry.key)!.map(kiranaFile),
          ...(Object.keys(packages).length > 0
            ? { dependencies: packages }
            : {}),
          ...(needs.length > 0 ? { registryDependencies: needs } : {}),
        }
      }

    const axes = axesOf(styles.map((file) => file.content).join("\n"))

    // The style modules flattened for each style and each base the item has (D-110), from the
    // modules the builder flattened and checked for the shadcn export, imports written as an
    // installed project names them. None when one of its modules is not flattened (a helper).
    const builds: Record<string, Record<string, KiranaFile[]>> = {}
    for (const combination of COMBINATIONS) {
      if (listsBases && !bases.has(baseKey(combination))) continue
      const files = styles.map((file) => {
        const module = file.source.replace(/^styles\//, "")
        const code = flattenedOf(combination, module)
        return code === undefined
          ? undefined
          : kiranaFile({
              ...file,
              content: code.replaceAll(
                `@/registry/${combination.id}/`,
                "@/registry/"
              ),
            })
      })
      if (styles.length === 0 || files.includes(undefined)) continue
      ;(builds[combination.style] ??= {})[combination.base] =
        files as KiranaFile[]
    }
    items.push({
      $schema: KIRANA_ITEM,
      name: item.name,
      type: kindOf(item),
      version,
      title: item.title,
      description: item.description,
      kirana,
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      ...(Object.keys(dependencies).length > 0 ? { dependencies } : {}),
      ...(axes.length > 0 ? { axes } : {}),
      ...(styles.length > 0 ? { styles: styles.map(kiranaFile) } : {}),
      ...(listsBases ? { frameworks } : {}),
      ...(shared.length > 0 ? { files: shared.map(kiranaFile) } : {}),
      ...(Object.keys(builds).length > 0
        ? { flattened: { axis: "style", builds } }
        : {}),
      ...(kindOf(item) === "design-system" ? { design: designOf() } : {}),
      ...(item.setup ? { setup: item.setup } : {}),
    })
  }

  const index: KiranaIndex = {
    $schema: KIRANA_INDEX,
    name: "Kirana UI",
    homepage: "https://ui.kirana.style",
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      version: item.version,
      ...(item.frameworks
        ? {
            frameworks: Object.fromEntries(
              Object.entries(item.frameworks).map(([framework, bases]) => [
                framework,
                Object.keys(bases!),
              ])
            ),
          }
        : {}),
    })),
  }
  return { items, index, problems }
}
