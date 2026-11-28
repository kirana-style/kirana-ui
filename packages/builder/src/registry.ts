/**
 * The registry's JSON for every combination: each item's files with their imports written for an
 * installed project, the style modules flattened, its npm and registry dependencies read from its
 * imports, all validated against shadcn/ui's own schema.
 *
 * An import between two of the registry's files becomes `@/registry/<combination>/<path>`, which
 * shadcn's CLI rewrites to the project's aliases (`ui/` to `aliases.ui`, `lib/` to `aliases.lib`,
 * `components/` to `aliases.components`); two files installed in one folder keep a relative import,
 * so the design system's own modules load without the aliases (its `kirana.ts` from
 * `kirana.config.ts`).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, posix } from "node:path"

import {
  ICON_LIBRARIES,
  importsOf,
  packageOf,
  resolveIcons,
  versionsFrom as kiranaVersionsFrom,
} from "@kirana-style/registry"
import type {
  InlineIcon,
  Framework as KiranaFramework,
} from "@kirana-style/registry"
import { registryItemSchema, registrySchema } from "@shadcn/registry/schema"

import type { Combination, Framework, Item } from "./items"
import { ITEMS, installedPath } from "./items"

export const SCHEMA_ITEM = "https://ui.shadcn.com/schema/registry-item.json"
export const SCHEMA_REGISTRY = "https://ui.shadcn.com/schema/registry.json"

/** Packages a project has by being of its framework. */
const FRAMEWORK_PACKAGES = new Set([
  "react",
  "react-dom",
  "vue",
  "svelte",
  "solid-js",
  // Solid 2's DOM runtime, which a Solid 2 project has as `solid-js`'s companion.
  "@solidjs/web",
  "@angular/core",
])

/**
 * Each framework's icon placeholder, by its installed place. The installers resolve it: each
 * `<IconPlaceholder … />` (Angular's `<svg iconPlaceholder …>`) becomes the project's icon
 * library's own icon (`iconLibrary`: shadcn/ui's CLI for React, `kirana-style ui` for every
 * framework), and the placeholder's import is dropped. A file whose placeholders all resolve does
 * not depend on the `icon-placeholder` item, which stays in the registry for a project that wants
 * the placeholder itself.
 */
const PLACEHOLDERS = new Set([
  "lib/kirana/icons/icon-placeholder",
  "lib/kirana/icons/IconPlaceholder.vue",
  "lib/kirana/icons/IconPlaceholder.svelte",
  "lib/kirana/icons/angular",
  // Solid's, one per base.
  "ui/icon-placeholder",
])

/** The framework Kirana's icon step reads a file as: only Angular's placeholder is resolved apart. */
function iconFramework(file: BuiltFile): KiranaFramework {
  if (file.installed.endsWith(".vue")) return "vue"
  if (file.installed.endsWith(".svelte")) return "svelte"
  return /icons\/angular["']/.test(file.content) ? "angular" : "react"
}

/** Any icon an inline drawing asks for: the check reads the markup, not the library's data. */
class AnyIcon extends Map<string, InlineIcon> {
  override get(): InlineIcon {
    return { attributes: [], inner: "" }
  }
}

/** A placeholder still in a file once the installer is done with it. */
const LEFT =
  /<IconPlaceholder\b|\bh\(\s*IconPlaceholder\b|<svg\b[^>]*\siconPlaceholder[\s>]/

/**
 * A file as Kirana's installer writes it (for Lucide), and what is wrong with it for any library:
 * a placeholder that names no icon for a library stops the install, and one left in the file (a
 * bound name, a spread, a render function's) needs every library's data at run time.
 */
export function resolvedIcons(file: BuiltFile): {
  content: string
  problems: string[]
} {
  const framework = iconFramework(file)
  const problems = new Set<string>()
  let content = file.content
  for (const library of ICON_LIBRARIES) {
    try {
      const resolved = resolveIcons(
        file.installed,
        file.content,
        framework,
        library,
        new AnyIcon()
      ).content
      if (library === "lucide") content = resolved
      if (LEFT.test(resolved))
        problems.add(
          `${file.installed} keeps an icon placeholder the installer cannot resolve: write each icon's names on it`
        )
    } catch (error) {
      problems.add(error instanceof Error ? error.message : String(error))
    }
  }
  return { content, problems: [...problems] }
}

// Reading a file's imports and naming their packages are Kirana's own (`ui build`, KRN-DX-034).
export { importsOf, packageOf } from "@kirana-style/registry"

const EXTENSIONS = ["", ".ts", ".tsx", ".vue", ".svelte", "/index.ts"]

/** The registry file a relative import names, from the importing file. */
export function resolveSource(
  registry: string,
  from: string,
  specifier: string
): string {
  const base = posix.join(posix.dirname(from), specifier)
  for (const extension of EXTENSIONS) {
    const candidate = `${base}${extension}`
    if (existsSync(join(registry, candidate)) && !candidate.endsWith("/")) {
      if (extension === "" && !/\.(tsx?|vue|svelte|css|json)$/.test(candidate))
        continue
      return candidate
    }
  }
  throw new Error(`${from} imports ${specifier}, which is not a registry file.`)
}

const withoutExtension = (path: string) => path.replace(/\.(tsx?)$/, "")

/**
 * A registry file's imports rewritten for an installed project: `@/registry/<combination>/<place>`
 * for shadcn/ui's CLI, or `prefix` (`@/registry` for Kirana's items, whose markup is one per base).
 */
export function rewriteImports(
  registry: string,
  source: string,
  code: string,
  combination: Combination,
  prefix = `@/registry/${combination.id}`
): string {
  const from = installedPath(source)
  return code.replace(
    /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}\/[^"']+)\2/g,
    (_, lead: string, quote: string, specifier: string) => {
      const target = installedPath(resolveSource(registry, source, specifier))
      const keepExtension = /\.(ts|tsx|vue|svelte)$/.test(specifier)
      const named =
        keepExtension || /\.(vue|svelte)$/.test(target)
          ? target
          : withoutExtension(target)
      // A folder's `index.ts`, imported by the folder, keeps being imported by the folder.
      const path = !specifier.endsWith("index")
        ? named.replace(/\/index$/, "")
        : named
      const rewritten =
        posix.dirname(target) === posix.dirname(from)
          ? `./${posix.basename(path)}`
          : `${prefix}/${path}`
      return `${lead}${quote}${rewritten}${quote}`
    }
  )
}

/** The files of an item for a combination, with any `dir/*` expanded. */
export function sourcesOf(
  registry: string,
  item: Item,
  combination: Combination
) {
  const files = item.files(combination)
  if (!files) return undefined
  return files.flatMap((file) =>
    file.endsWith("/*")
      ? readdirSync(join(registry, file.slice(0, -2)))
          .filter((name) => /\.(vue|svelte|ts)$/.test(name))
          .sort()
          .map((name) => `${file.slice(0, -2)}/${name}`)
      : [file]
  )
}

export type BuiltFile = { source: string; installed: string; content: string }

/** Which item installs each place (`ui/button`, without its extension), from items' files. */
export function ownersOf(
  built: Iterable<[Item, BuiltFile[]]>,
  owner = new Map<string, string>()
): Map<string, string> {
  for (const [item, files] of built)
    for (const file of files)
      owner.set(withoutExtension(file.installed), item.name)
  return owner
}

/**
 * What an item's files import: npm packages with their version ranges, and the other items that
 * install what they import, by name. `prefix` is how a file names another item's place
 * (`@/registry/<combination>` or `@/registry`).
 */
export function dependenciesOf(
  files: readonly BuiltFile[],
  item: string,
  owner: ReadonlyMap<string, string>,
  prefix: string,
  versions: (name: string) => string | undefined
) {
  const dependencies = new Map<string, string>()
  const registryDependencies = new Set<string>()
  const problems: string[] = []
  // The item's own files first: blocks install their parts at shared places, as upstream's do
  // (every sidebar block has a `components/app-sidebar.tsx`), where another item may own the path.
  const own = new Set(files.map((file) => withoutExtension(file.installed)))
  const provide = (file: BuiltFile, specifier: string, path: string) => {
    if (own.has(path) || own.has(`${path}/index`)) return
    const provider = owner.get(path) ?? owner.get(`${path}/index`)
    if (!provider)
      problems.push(
        `${item}: ${file.installed} imports ${specifier}, which no item provides.`
      )
    else if (provider !== item) registryDependencies.add(provider)
  }
  for (const file of files) {
    const imports = importsOf(file.content)
    const placeOf = (specifier: string) =>
      specifier.startsWith("./")
        ? withoutExtension(posix.join(posix.dirname(file.installed), specifier))
        : specifier.startsWith(`${prefix}/`)
          ? withoutExtension(specifier.slice(prefix.length + 1))
          : undefined
    // A placeholder the installer resolves is no dependency; one it leaves is a problem, and the
    // placeholder's import it keeps (Angular's `IconDrawing`) still is.
    let kept: Set<string> | undefined
    if (
      imports.some((specifier) => {
        const place = placeOf(specifier)
        return place !== undefined && PLACEHOLDERS.has(place) && !own.has(place)
      })
    ) {
      const resolved = resolvedIcons(file)
      problems.push(
        ...resolved.problems.map((problem) => `${item}: ${problem}`)
      )
      kept = new Set(importsOf(resolved.content))
    }
    for (const specifier of imports) {
      const place = placeOf(specifier)
      if (
        place !== undefined &&
        kept &&
        PLACEHOLDERS.has(place) &&
        !kept.has(specifier)
      )
        continue
      if (specifier.startsWith("./")) {
        // Installed in the same folder: the item's own file, or another item's (a dependency).
        provide(file, specifier, place!)
      } else if (specifier.startsWith(`${prefix}/`)) {
        provide(file, specifier, place!)
      } else if (!specifier.startsWith(".")) {
        const name = packageOf(specifier)
        if (FRAMEWORK_PACKAGES.has(name)) continue
        const version = versions(name)
        if (!version) problems.push(`${item}: ${name} has no version.`)
        else dependencies.set(name, version)
      } else {
        problems.push(
          `${item}: ${file.installed} keeps a relative import ${specifier}.`
        )
      }
    }
  }
  return {
    dependencies: new Map(
      [...dependencies].sort(([a], [b]) => a.localeCompare(b))
    ),
    registryDependencies: [...registryDependencies].sort(),
    problems,
  }
}

// A block's data (`dashboard-01`'s `data.json`) is a plain file, as upstream's.
const fileType = (installed: string) =>
  installed.endsWith(".json")
    ? "registry:file"
    : installed.startsWith("ui/")
      ? "registry:ui"
      : installed.startsWith("lib/")
        ? "registry:lib"
        : "registry:component"

const targetOf = (installed: string) =>
  installed.startsWith("ui/")
    ? `@ui/${installed.slice(3)}`
    : installed.startsWith("lib/")
      ? `@lib/${installed.slice(4)}`
      : installed.startsWith("components/")
        ? `@components/${installed.slice(11)}`
        : `@components/${installed}`

/**
 * One combination's items. `contentOf` gives a file's content for the combination (the style
 * modules flattened); `versions` each package's version range.
 */
export function buildCombination(
  registry: string,
  combination: Combination,
  contentOf: (source: string) => string,
  versions: Versions
) {
  const built = new Map<Item, BuiltFile[]>()
  for (const item of ITEMS) {
    if (item.kiranaOnly) continue
    const sources = sourcesOf(registry, item, combination)
    if (!sources) continue
    built.set(
      item,
      sources.map((source) => ({
        source,
        installed: installedPath(source),
        content: rewriteImports(
          registry,
          source,
          contentOf(source),
          combination
        ),
      }))
    )
  }

  const owner = ownersOf(built)
  const problems: string[] = []
  const items = [...built].map(([item, files]) => {
    const found = dependenciesOf(
      files,
      item.name,
      owner,
      `@/registry/${combination.id}`,
      (name) =>
        versions(name, {
          framework: combination.framework,
          base: combination.base,
        })
    )
    problems.push(
      ...found.problems.map((problem) => `${combination.id}/${problem}`)
    )
    const dependencies = [...found.dependencies].map(
      ([name, version]) => `${name}@${version}`
    )
    const registryDependencies = [...found.registryDependencies].map(
      (name) => `@kirana/${name}`
    )
    const json = {
      $schema: SCHEMA_ITEM,
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: [...dependencies].sort(),
      registryDependencies: [...registryDependencies].sort(),
      files: files.map((file) => ({
        path: `registry/${combination.id}/${file.installed}`,
        type: fileType(file.installed),
        target: targetOf(file.installed),
        content: file.content,
      })),
    }
    const parsed = registryItemSchema.safeParse(json)
    if (!parsed.success)
      problems.push(`${combination.id}/${item.name}: ${parsed.error.message}`)
    return json
  })

  const index = {
    $schema: SCHEMA_REGISTRY,
    name: `kirana-${combination.id}`,
    homepage: "https://ui.kirana.style",
    // The catalog lists each item and its files' places, without their content.
    items: items.map(({ files, ...rest }) => ({
      name: rest.name,
      type: rest.type,
      title: rest.title,
      description: rest.description,
      dependencies: rest.dependencies,
      registryDependencies: rest.registryDependencies,
      files: files.map((file) => ({
        path: file.path,
        type: file.type,
        target: file.target,
      })),
    })),
  }
  const parsed = registrySchema.safeParse(index)
  if (!parsed.success)
    problems.push(`${combination.id}/registry.json: ${parsed.error.message}`)

  return { items, index, problems }
}

/** A package's version range, for a framework and base when one is given. */
export type Versions = (
  name: string,
  combination?: { framework: Framework; base: string }
) => string | undefined

/**
 * Each package's version range as the registry package declares it, a `catalog:` read from the
 * workspace's catalog: Kirana's `versionsFrom` (`ui build`), on `registry/`. For a framework and
 * base, a base's own `package.json` comes first (`bases/solid-uisdk/package.json`: Solid 2's
 * packages, where Solid's other bases take Solid 1's). A package the registry does not declare (a
 * font's, which only `packages/fonts` lists) takes the catalog's range.
 */
export function versionsFrom(root: string): Versions {
  const declared = kiranaVersionsFrom(join(root, "registry"))
  const catalog: Record<string, string> =
    JSON.parse(readFileSync(join(root, "package.json"), "utf8")).workspaces
      ?.catalog ?? {}
  return (name, combination) => declared(name, combination) ?? catalog[name]
}
