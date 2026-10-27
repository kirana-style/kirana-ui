/**
 * Writes an evaluated style module back as Kirana source: every `css()` and `recipe()` with its
 * style object, tokens as `theme.primary`, relation reads as `field.within("…")`, targets as
 * `select.child("…")`, keyframes declared once. Helper functions and the comments are not carried
 * over: the values they produced are written out.
 *
 * It records the line of each `css()` and `recipe()` it writes, which Kirana's `trace()` takes.
 */
import { readFileSync } from "node:fs"

import type { RecipeHandle, StyleHandle, StyleObject } from "./kirana-stub"
import { declaredKeyframes } from "./kirana-stub"
import { only, plainStates, split } from "./markers"
import type { Marker } from "./markers"
import { mergeStyles } from "./styles"

/** The design system's modules a flattened module imports from. */
export type CoreModule = "tokens" | "context" | "axes"

export type Names = {
  /** A variable token group's export, and the module that exports it. */
  tokens: Map<string, { module: CoreModule; name: string }>
  /** A marker the axes module exports, as the expression that reads it (`axes.menuColor.inverted`). */
  axes: Map<string, string>
  /** The registry module that declares a relation, and its export, by the relation's name. */
  relations: Map<string, { module: string; name: string }>
}

export type Generated = {
  code: string
  /** Each `css()` handle's line, by its path in the module's exports (`dialog.content`). */
  sites: Map<string, number>
}

const isObject = (value: unknown): value is StyleObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)
const isStyle = (value: unknown): value is StyleHandle =>
  isObject(value) && value.kind === "style"
const isRecipe = (value: unknown): value is RecipeHandle =>
  isObject(value) && value.kind === "recipe"
const isRelation = (
  value: unknown
): value is { name: string; optional?: boolean } =>
  isObject(value) &&
  typeof value.name === "string" &&
  typeof value.within === "function"

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

export function quote(text: string) {
  return text.includes('"') && !text.includes("'")
    ? `'${text}'`
    : JSON.stringify(text)
}

export function generate(
  exports: Record<string, unknown>,
  names: Names,
  options: {
    flatten: (handle: StyleHandle) => StyleHandle
    flattenRecipe: (handle: RecipeHandle) => RecipeHandle
    imports: (module: CoreModule) => string
    header: string
    /** The style module being written (`field.styles.ts`); its relations are its own to declare. */
    module?: string
    /**
     * Where a relation another module declares is imported from. Kirana allows one declaration of
     * a name in a project, so a module never declares another's. When `own` is true the module's
     * own relations are imported too (the check's modules, beside their sources).
     */
    relationsFrom: (module: string) => { specifier: string; own: boolean }
  }
): Generated {
  const used = {
    kirana: new Set<string>(),
    core: new Map<CoreModule, Set<string>>(),
    relations: new Map<string, { module: string; name: string }>(),
    keyframes: new Map<string, string>(),
  }
  /** Kirana's function under the name this module can use: `select` is aliased beside an export of it. */
  const kirana = (name: string) => {
    used.kirana.add(name)
    return name in exports
      ? `kirana${name[0].toUpperCase()}${name.slice(1)}`
      : name
  }
  const exportedRelations = new Map<string, string>()
  for (const [name, value] of Object.entries(exports)) {
    if (isRelation(value)) exportedRelations.set(value.name, name)
  }

  const useCore = (module: CoreModule, name: string) => {
    if (!used.core.has(module)) used.core.set(module, new Set())
    used.core.get(module)!.add(name)
  }
  const relationName = (relation: string) => {
    const declared = names.relations.get(relation)
    if (!declared)
      throw new Error(`No registry module exports the relation "${relation}".`)
    const own = declared.module === options.module
    if (!own || options.relationsFrom(declared.module).own)
      used.relations.set(relation, declared)
    return declared.name
  }

  function markerCode(marker: Marker, text: string): string {
    switch (marker.kind) {
      case "token": {
        const token = names.tokens.get(marker.group)
        if (!token)
          throw new Error(
            `No module exports the token group "${marker.group}".`
          )
        useCore(token.module, token.name)
        return IDENTIFIER.test(marker.key)
          ? `${token.name}.${marker.key}`
          : `${token.name}[${quote(marker.key)}]`
      }
      case "read":
      case "anchor": {
        const axis = names.axes.get(text)
        if (axis) {
          useCore("axes", "axes")
          return axis
        }
        const relation = relationName(marker.relation)
        return marker.kind === "anchor"
          ? `${relation}.anchor`
          : `${relation}.${marker.how}(${marker.condition ? quote(plainStates(marker.condition)) : ""})`
      }
      case "target":
        return `${kirana("select")}.${marker.how}(${quote(marker.selector)})`
      case "state":
        return quote(marker.key)
      case "keyframes": {
        kirana("keyframes")
        if (!used.keyframes.has(marker.id)) {
          used.keyframes.set(
            marker.id,
            keyframesName(marker.id, used.keyframes.size)
          )
        }
        return used.keyframes.get(marker.id)!
      }
    }
  }

  function leaf(value: unknown): string {
    if (value === null) return "null"
    if (typeof value === "number") return String(value)
    if (typeof value !== "string")
      throw new Error(`Unexpected value ${String(value)}`)
    const parts = split(value)
    if (parts.length === 1 && typeof parts[0] !== "string")
      return markerCode(parts[0], value)
    if (parts.every((part) => typeof part === "string")) return quote(value)
    return `\`${parts
      .map((part) =>
        typeof part === "string"
          ? part.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${")
          : `\${${markerCode(part, "")}}`
      )
      .join("")}\``
  }

  function key(text: string): string {
    const marker = only(text)
    if (marker?.kind === "state") return quote(marker.key)
    if (marker) return `[${markerCode(marker, text)}]`
    return IDENTIFIER.test(text) ? text : quote(text)
  }

  function object(value: StyleObject, indent: string): string {
    const inner = `${indent}  `
    const lines = Object.entries(value).map(
      ([name, entry]) => `${inner}${key(name)}: ${any(entry, inner)},`
    )
    const flat = `{ ${Object.entries(value)
      .map(([name, entry]) => `${key(name)}: ${any(entry, inner)}`)
      .join(", ")} }`
    return !flat.includes("\n") && flat.length + indent.length < 90
      ? flat
      : `{\n${lines.join("\n")}\n${indent}}`
  }

  function any(value: unknown, indent: string): string {
    return isObject(value) ? object(value, indent) : leaf(value)
  }

  function style(handle: StyleHandle, path: string, indent: string): string {
    const css = kirana("css")
    const flat = options.flatten(handle)
    const merged = flat.styles.reduce(mergeStyles, {} as StyleObject)
    const anchors = flat.anchors.map((anchor) => `${leaf(anchor)}, `).join("")
    return `/*@site ${path}*/${css}(${anchors}${object(merged, indent)})`
  }

  function recipeCode(
    handle: RecipeHandle,
    path: string,
    indent: string
  ): string {
    return `/*@site ${path}*/${kirana("recipe")}(${object(options.flattenRecipe(handle).config, indent)})`
  }

  function member(
    entry: unknown,
    path: string,
    indent: string
  ): string | undefined {
    if (isStyle(entry)) return style(entry, path, indent)
    if (isRecipe(entry)) return recipeCode(entry, path, indent)
    if (typeof entry === "string" || typeof entry === "number")
      return leaf(entry)
    if (isObject(entry) && !isRelation(entry)) {
      const inner = `${indent}  `
      const members = Object.entries(entry)
        .map(([name, part]) => {
          const code = member(part, `${path}.${name}`, inner)
          return code === undefined
            ? undefined
            : `${inner}${key(name)}: ${code},`
        })
        .filter((line) => line !== undefined)
      return members.length ? `{\n${members.join("\n")}\n${indent}}` : undefined
    }
    return undefined
  }

  const body: string[] = []
  for (const [name, entry] of Object.entries(exports)) {
    if (isRelation(entry)) {
      const from = options.module
        ? options.relationsFrom(options.module)
        : undefined
      if (from?.own) {
        used.relations.set(entry.name, { module: options.module!, name })
        body.push(`export { ${name} }`)
      } else {
        body.push(
          `export const ${name} = ${kirana("relation")}(${quote(entry.name)}${entry.optional ? ", { optional: true }" : ""})`
        )
      }
      continue
    }
    const code = member(entry, name, "")
    if (code !== undefined) body.push(`export const ${name} = ${code}`)
  }

  const head: string[] = [options.header]
  const kiranaImports = [...used.kirana]
    .sort()
    .map((name) =>
      kirana(name) === name ? name : `${name} as ${kirana(name)}`
    )
  head.push(`import { ${kiranaImports.join(", ")} } from "@kirana-style/core"`)
  const coreImports = [...used.core.entries()].sort(([a], [b]) =>
    a.localeCompare(b)
  )
  if (coreImports.length) head.push("")
  for (const [module, imported] of coreImports) {
    head.push(
      `import { ${[...imported].sort().join(", ")} } from ${quote(options.imports(module))}`
    )
  }
  const relationImports = new Map<string, Set<string>>()
  for (const { module, name } of used.relations.values()) {
    const { specifier } = options.relationsFrom(module)
    if (!relationImports.has(specifier))
      relationImports.set(specifier, new Set())
    relationImports.get(specifier)!.add(name)
  }
  for (const [specifier, imported] of [...relationImports].sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    head.push(
      `import { ${[...imported].sort().join(", ")} } from ${quote(specifier)}`
    )
  }
  const declarations: string[] = []
  for (const [id, name] of used.keyframes) {
    declarations.push(
      `const ${name} = ${kirana("keyframes")}(${object(declaredKeyframes.get(id)!.frames, "")})`
    )
  }

  const lines = [
    ...head,
    "",
    ...(declarations.length ? [...declarations, ""] : []),
    ...body.flatMap((block) => [block, ""]),
  ]
    .join("\n")
    .split("\n")
  const sites = new Map<string, number>()
  const code = lines
    .map((line, index) =>
      line.replace(/\/\*@site ([^*]+)\*\//g, (_, path: string) => {
        sites.set(path, index + 1)
        return ""
      })
    )
    .join("\n")
  return { code: `${code.trimEnd()}\n`, sites }
}

/** A keyframes rule's name: the `const` it was declared as, when its line says so. */
function keyframesName(id: string, index: number): string {
  const site = declaredKeyframes.get(id)?.site
  if (site?.file) {
    try {
      const line = readFileSync(site.file, "utf8").split("\n")[site.line - 1]
      const name = /const\s+([A-Za-z_$][\w$]*)\s*=\s*keyframes\(/.exec(
        line
      )?.[1]
      if (name) return name
    } catch {
      // The name is only for reading; fall back to a numbered one.
    }
  }
  return `frames${index}`
}
