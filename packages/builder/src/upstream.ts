/**
 * What each item was ported from, in shadcn/ui's repository, and what changed there since: the
 * provenance manifest (`upstream/shadcn.json`) and the scanner that compares it with upstream at a
 * commit (`upstream-cli.ts`).
 *
 * An item's units are the upstream files it was ported from and, for each `cn-*` hook its markup
 * names, that hook's rule in every style file the registry carries. Each unit is recorded by its
 * hash at the commit it was ported from. A hook's place in the registry is read from the comment
 * that names it in a style module (`// cn-field-set` above `set: css(…)`), so the manifest never
 * says by hand what the source already says.
 */
import { createHash } from "node:crypto"
import { spawnSync } from "node:child_process"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

export const REPOSITORY = "shadcn-ui/ui"
export const V4 = "apps/v4/registry"

export type ManifestItem = {
  /** The upstream commit the item's units were stamped at. */
  ported: string
  units: Record<string, string>
  /** Each upstream hook and where it went (`registry/styles/field.styles.ts#field.set`). */
  hooks: Record<string, string>
  /** A hook with no place of its own, and why. */
  dropped?: Record<string, string>
  /** What differs from upstream on purpose. */
  deviations?: string[]
}

export type Manifest = {
  repository: string
  items: Record<string, ManifestItem>
}

/** An item ported from upstream: a component, an example page or a block. */
export type Ported = {
  name: string
  kind: "component" | "example" | "block"
}

/** Upstream's repository read at a commit, through git. */
export class Upstream {
  constructor(readonly repo: string) {}

  #git(args: string[]) {
    const result = spawnSync("git", ["-C", this.repo, ...args], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    })
    return result.status === 0 ? result.stdout : undefined
  }

  /** The short commit `ref` names. */
  commit(ref: string): string {
    const sha = this.#git(["rev-parse", "--short=7", `${ref}^{commit}`])
    if (!sha)
      throw new Error(`upstream: ${ref} is not a commit in ${this.repo}`)
    return sha.trim()
  }

  /** A file's text at `ref`, or undefined when it does not exist there. */
  read(ref: string, path: string): string | undefined {
    return this.#git(["show", `${ref}:${path}`])
  }

  /** The files under `folder` at `ref`. */
  list(ref: string, folder: string): string[] {
    return (
      this.#git(["ls-tree", "-r", "--name-only", ref, "--", folder]) ?? ""
    )
      .split("\n")
      .filter(Boolean)
  }
}

export const hash = (text: string) =>
  `sha256:${createHash("sha256").update(text).digest("hex").slice(0, 16)}`

/** Every `.cn-*` rule of a style file, by hook: its `@apply` list, normalised. */
export function rulesOf(css: string): Map<string, string> {
  const rules = new Map<string, string>()
  for (const match of css.matchAll(/\.(cn-[a-z0-9-]+)\s*\{([^{}]*)\}/g)) {
    const body = match[2]
      .replace(/@apply/g, "")
      .replace(/;/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .join(" ")
    rules.set(
      match[1],
      rules.has(match[1]) ? `${rules.get(match[1])} ${body}` : body
    )
  }
  return rules
}

/** The hooks a file's markup names. */
export const hooksIn = (text: string) =>
  [...new Set(text.match(/\bcn-[a-z0-9-]+/g) ?? [])].sort()

/** The utilities one class list adds and removes against another. */
export function classDiff(before: string, after: string) {
  const a = new Set(before.split(/\s+/).filter(Boolean))
  const b = new Set(after.split(/\s+/).filter(Boolean))
  return {
    added: [...b].filter((utility) => !a.has(utility)),
    removed: [...a].filter((utility) => !b.has(utility)),
  }
}

/**
 * Each hook a comment names in a style module, and where: the module and the path of the next key
 * or export after the comment (`field.styles.ts#field.set`).
 */
export function hookPlaces(file: string, text: string): Map<string, string> {
  const places = new Map<string, string>()
  const lines = text.split("\n")
  let owner = ""
  for (let i = 0; i < lines.length; i++) {
    const exported = /^export const (\w+)/.exec(lines[i])
    if (exported) owner = exported[1]
    const comment = /^\s*\/\/(.*)$/.exec(lines[i])
    if (!comment) continue
    const hooks = comment[1].match(/\bcn-[a-z0-9-]+/g)
    if (!hooks) continue
    let place = owner
    for (let j = i + 1; j < lines.length; j++) {
      const next =
        /^export const (\w+)/.exec(lines[j]) ?? /^\s*(\w+):/.exec(lines[j])
      if (next) {
        place = lines[j].startsWith("export") ? next[1] : `${owner}.${next[1]}`
        break
      }
    }
    for (const hook of hooks)
      if (!places.has(hook))
        places.set(hook, `registry/styles/${file}#${place}`)
  }
  return places
}

/** Every hook placed in the registry's style modules. */
export function registryHooks(registry: string): Map<string, string> {
  const places = new Map<string, string>()
  const folder = join(registry, "styles")
  for (const file of readdirSync(folder).sort()) {
    if (!file.endsWith(".ts")) continue
    for (const [hook, place] of hookPlaces(
      file,
      readFileSync(join(folder, file), "utf8")
    ))
      if (!places.has(hook)) places.set(hook, place)
  }
  return places
}

/** The upstream files an item was ported from, at `ref`. */
export function filesOf(
  upstream: Upstream,
  ref: string,
  item: Ported
): string[] {
  const bases = ["base", "aria"]
  if (item.kind === "block")
    return bases.flatMap((base) =>
      upstream.list(ref, `${V4}/bases/${base}/blocks/${item.name}`)
    )
  const folder = item.kind === "component" ? "ui" : "examples"
  return bases
    .map((base) => `${V4}/bases/${base}/${folder}/${item.name}.tsx`)
    .filter((path) => upstream.read(ref, path) !== undefined)
}

/**
 * An item's units at `ref`: each file's hash, and each hook's rule in each of `styles`, absent ones
 * included (a style that adds the rule later is a change).
 */
export function unitsOf(
  upstream: Upstream,
  ref: string,
  item: Ported,
  styles: readonly string[]
) {
  const units: Record<string, string> = {}
  const hooks = new Set<string>()
  for (const path of filesOf(upstream, ref, item)) {
    const text = upstream.read(ref, path)!
    units[path] = hash(text)
    if (item.kind === "component")
      for (const hook of hooksIn(text)) hooks.add(hook)
  }
  for (const style of styles) {
    const path = `${V4}/styles/style-${style}.css`
    const rules = rulesOf(upstream.read(ref, path) ?? "")
    for (const hook of [...hooks].sort())
      units[`${path}#${hook}`] = rules.has(hook)
        ? hash(rules.get(hook)!)
        : "absent"
  }
  return { units, hooks: [...hooks].sort() }
}

/** Where each hook went, `cn-*-aria` with its plain hook (React Aria's keys of the same property). */
export function placeHooks(
  hooks: readonly string[],
  places: Map<string, string>
) {
  const placed: Record<string, string> = {}
  const unmapped: string[] = []
  for (const hook of hooks) {
    const place = places.get(hook) ?? places.get(hook.replace(/-aria$/, ""))
    if (place) placed[hook] = place
    else unmapped.push(hook)
  }
  return { placed, unmapped }
}
