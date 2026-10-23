/**
 * A style object as entries: each value with the conditions it sits under, outermost first. Kirana
 * normalizes a condition set (sorted, deduplicated), so two paths with the same conditions are one
 * entry; merging replaces entries by set, as Kirana merges styles (`{ base: null }` removes one,
 * `"*": null` all those not restated).
 */
import { only } from "./markers"
import type { StyleObject } from "./kirana-stub"

export type Leaf = string | number | null

export type Entry = { path: string[]; value: Leaf }

/** A key whose value is a nested style object: a pseudo-element or a `select` target. */
export function isNestedStyleKey(key: string) {
  return key.startsWith("::") || only(key)?.kind === "target"
}

const isObject = (value: unknown): value is StyleObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

/** The entries of one property's value. */
export function entriesOf(value: unknown, path: string[] = []): Entry[] {
  if (!isObject(value)) return [{ path, value: value as Leaf }]
  const entries: Entry[] = []
  for (const [key, inner] of Object.entries(value)) {
    if (key === "*") continue
    entries.push(...entriesOf(inner, key === "base" ? path : [...path, key]))
  }
  return entries
}

export const setKey = (path: string[]) =>
  [...new Set(path)].sort().join("\u0002")

/** Entries by condition set, in first-seen order; a later entry for a set replaces the earlier. */
export function byConditionSet(entries: Entry[]) {
  const sets = new Map<string, Entry>()
  for (const entry of entries) {
    const key = setKey(entry.path)
    if (sets.has(key))
      sets.set(key, { path: sets.get(key)!.path, value: entry.value })
    else sets.set(key, entry)
  }
  return sets
}

type Node = { value?: Leaf; children: Map<string, Node> }

/** A property's value written back from its entries: a plain value, or nested by path. */
export function valueOf(entries: Entry[]): unknown {
  const root: Node = { children: new Map() }
  for (const { path, value } of entries) {
    let node = root
    for (const key of path) {
      let next = node.children.get(key)
      if (!next) node.children.set(key, (next = { children: new Map() }))
      node = next
    }
    node.value = value
  }
  return write(root)
}

/** A node as Kirana's syntax: its value alone when it has no conditions under it. */
function write(node: Node): unknown {
  if (node.children.size === 0) return node.value
  const object: StyleObject = {}
  if (node.value !== undefined) object.base = node.value
  for (const [key, child] of node.children) object[key] = write(child)
  return object
}

/** Kirana's merge of two style objects: properties entry by entry, nested styles recursively. */
export function mergeStyles(
  earlier: StyleObject,
  later: StyleObject
): StyleObject {
  const merged: StyleObject = { ...earlier }
  for (const [key, value] of Object.entries(later)) {
    if (isNestedStyleKey(key) && isObject(value)) {
      merged[key] = mergeStyles(isObject(merged[key]) ? merged[key] : {}, value)
    } else if (value === null) {
      delete merged[key]
    } else if (key in merged) {
      const keepEarlier = !(
        isObject(value) && (value as StyleObject)["*"] === null
      )
      const sets = byConditionSet([
        ...(keepEarlier ? entriesOf(merged[key]) : []),
        ...entriesOf(value),
      ])
      const kept = [...sets.values()].filter((entry) => entry.value !== null)
      merged[key] = kept.length ? valueOf(kept) : undefined
      if (merged[key] === undefined) delete merged[key]
    } else merged[key] = value
  }
  return merged
}
