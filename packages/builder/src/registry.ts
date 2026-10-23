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

const IMPORT =
  /(?:import|export)\s[^'"]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g

/** Every module a file's source imports. */
export function importsOf(code: string): string[] {
  return [...code.matchAll(IMPORT)].map(
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

/** A registry file's imports rewritten for an installed project. */
export function rewriteImports(
  registry: string,
  source: string,
  code: string,
  combination: Combination
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
          : `@/registry/${combination.id}/${path}`
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

  const owner = new Map<string, Item>()
  for (const [item, files] of built) {
    for (const file of files) owner.set(withoutExtension(file.installed), item)
  }

  const problems: string[] = []
  const items = [...built].map(([item, files]) => {
    const dependencies = new Set<string>()
    const registryDependencies = new Set<string>()
    for (const file of files) {
      for (const specifier of importsOf(file.content)) {
        if (specifier.startsWith("./")) {
          // Installed in the same folder: the item's own file, or another item's (a dependency).
          const target = withoutExtension(
            posix.join(posix.dirname(file.installed), specifier)
          )
          const provider = owner.get(target)
          if (!provider)
            problems.push(
              `${combination.id}/${item.name}: ${file.installed} imports ${specifier}, which no item provides.`
            )
          else if (provider !== item)
            registryDependencies.add(`@kirana/${provider.name}`)
        } else if (specifier.startsWith(`@/registry/${combination.id}/`)) {
          const path = withoutExtension(
            specifier.slice(`@/registry/${combination.id}/`.length)
          )
          const provider = owner.get(path) ?? owner.get(`${path}/index`)
          if (!provider)
            problems.push(
              `${combination.id}/${item.name}: ${file.installed} imports ${specifier}, which no item provides.`
            )
          else if (provider !== item)
            registryDependencies.add(`@kirana/${provider.name}`)
        } else if (!specifier.startsWith(".")) {
          const name = packageOf(specifier)
          if (FRAMEWORK_PACKAGES.has(name)) continue
          const version = versions(name)
          if (!version)
            problems.push(
              `${combination.id}/${item.name}: ${name} has no version.`
            )
          else dependencies.add(`${name}@${version}`)
        } else {
          problems.push(
            `${combination.id}/${item.name}: ${file.installed} keeps a relative import ${specifier}.`
          )
        }
      }
    }
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
