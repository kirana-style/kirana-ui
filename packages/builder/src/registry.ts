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

import { registryItemSchema, registrySchema } from "@shadcn/registry/schema"

import type { Combination, Item } from "./items"
import { ITEMS, installedPath } from "./items"

export const SCHEMA_ITEM = "https://ui.shadcn.com/schema/registry-item.json"
export const SCHEMA_REGISTRY = "https://ui.shadcn.com/schema/registry.json"

/** Packages a project has by being of its framework. */
const FRAMEWORK_PACKAGES = new Set(["react", "react-dom", "vue"])

/**
 * React's icon placeholder, which shadcn/ui's CLI resolves at install: each `<IconPlaceholder … />`
 * becomes the project's icon library's component (`iconLibrary` in `components.json`), and the
 * import of a path holding `icon-placeholder` is dropped. A component that imports it does not
 * depend on the `icon-placeholder` item, which stays in the registry for a project that wants the
 * placeholder itself.
 */
const RESOLVED_AT_INSTALL = "lib/kirana/icons/icon-placeholder"

const IMPORT =
  /(?:import|export)\s[^'"]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g

/** Block comments, and line comments that are not a URL's `://`. */
const COMMENTS = /\/\*[\s\S]*?\*\/|(^|[^:])\/\/.*$/gm

/**
 * Every module a file's source imports. Comments go first: an apostrophe in one, inside an
 * `export { … } from` list, would otherwise read as a string and hide the statement.
 */
export function importsOf(code: string): string[] {
  return [...code.replace(COMMENTS, "$1").matchAll(IMPORT)].map(
    (match) => match[1] ?? match[2] ?? match[3]
  )
}

export const packageOf = (specifier: string) =>
  specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0]

const EXTENSIONS = ["", ".ts", ".tsx", ".vue", "/index.ts"]

/** The registry file a relative import names, from the importing file. */
function resolveSource(
  registry: string,
  from: string,
  specifier: string
): string {
  const base = posix.join(posix.dirname(from), specifier)
  for (const extension of EXTENSIONS) {
    const candidate = `${base}${extension}`
    if (existsSync(join(registry, candidate)) && !candidate.endsWith("/")) {
      if (extension === "" && !/\.(tsx?|vue|css)$/.test(candidate)) continue
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
      const keepExtension = /\.(ts|tsx|vue)$/.test(specifier)
      const named =
        keepExtension || target.endsWith(".vue")
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
          .filter((name) => /\.(vue|ts)$/.test(name))
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
  const provide = (file: BuiltFile, specifier: string, path: string) => {
    const provider = owner.get(path) ?? owner.get(`${path}/index`)
    if (!provider)
      problems.push(
        `${item}: ${file.installed} imports ${specifier}, which no item provides.`
      )
    else if (provider !== item) registryDependencies.add(provider)
  }
  for (const file of files) {
    for (const specifier of importsOf(file.content)) {
      if (specifier.startsWith("./")) {
        // Installed in the same folder: the item's own file, or another item's (a dependency).
        provide(
          file,
          specifier,
          withoutExtension(posix.join(posix.dirname(file.installed), specifier))
        )
      } else if (specifier.startsWith(`${prefix}/`)) {
        const path = withoutExtension(specifier.slice(prefix.length + 1))
        if (path !== RESOLVED_AT_INSTALL) provide(file, specifier, path)
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

const fileType = (installed: string) =>
  installed.startsWith("ui/")
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
  versions: (name: string) => string | undefined
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
      versions
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

/** Each package's version range: the workspace catalog's, else the registry package's own. */
export function versionsFrom(root: string) {
  const workspace = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
  const catalog: Record<string, string> = workspace.workspaces?.catalog ?? {}
  const registry = JSON.parse(
    readFileSync(join(root, "registry", "package.json"), "utf8")
  )
  return (name: string) => {
    const declared: string | undefined = registry.dependencies?.[name]
    if (declared && declared !== "catalog:") return declared
    return catalog[name]
  }
}
