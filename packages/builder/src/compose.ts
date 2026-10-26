/**
 * The compositions at use sites: every place the registry's markup combines two or more style
 * handles (`styleProps(a, b)`, `sx={[a, b]}`, `:sx="[a, b]"`), as probes for the winners check
 * (`check.ts`). Live, the handles merge as the site merges them; flattened, each handle is flattened
 * first and the results merged, as an installed project merges them. A style entry in one handle
 * beside a plain value in a handle composed after it flips once flattened, which the check of each
 * handle alone never sees.
 *
 * Read from the text, so an argument that is not a handle's path (a recipe call, the caller's `sx`,
 * a value computed in the component) is left out; a condition before `&&` is dropped and the handle
 * kept, since it is composed whenever the condition holds.
 */
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"

import type { Probe } from "./check"
import { addProbe } from "./check"
import type { Classify } from "./flatten"
import { flattenHandle } from "./flatten"
import type { StyleHandle, StyleObject } from "./kirana-stub"
import { mergeStyles } from "./styles"

/** Where a composition starts: the character after it is its first argument. */
const OPENERS = /styleProps\(|sx=\{\[|:sx="\[/g

/** The top-level arguments of the call or array whose opening bracket is at `open`. */
export function argumentsAt(text: string, open: number): string[] {
  const parts: string[] = []
  let depth = 0
  let start = open + 1
  for (let i = open; i < text.length; i++) {
    const char = text[i]
    if ("([{".includes(char)) depth++
    else if (")]}".includes(char)) {
      depth--
      if (depth === 0) {
        parts.push(text.slice(start, i))
        break
      }
    } else if (char === "," && depth === 1) {
      parts.push(text.slice(start, i))
      start = i + 1
    }
  }
  return parts.map((part) => part.trim()).filter(Boolean)
}

export type Composition = { paths: string[]; sites: Set<string> }

/** Every distinct composition of two or more handles in the markup under `bases`, by its paths. */
export function compositionsOf(
  bases: string,
  isHandle: (path: string) => boolean
): Map<string, Composition> {
  const compositions = new Map<string, Composition>()
  const walk = (folder: string) => {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name)
      if (entry.isDirectory()) walk(path)
      else if (/\.(tsx|vue)$/.test(entry.name)) {
        const text = readFileSync(path, "utf8")
        for (const match of text.matchAll(OPENERS)) {
          const paths = argumentsAt(text, match.index + match[0].length - 1)
            .map((part) => part.replace(/^.*&&\s*/, ""))
            .filter(isHandle)
          if (paths.length < 2) continue
          const key = paths.join(" + ")
          if (!compositions.has(key))
            compositions.set(key, { paths, sites: new Set() })
          compositions.get(key)!.sites.add(relative(bases, path))
        }
      }
    }
  }
  walk(bases)
  return compositions
}

/** Each composition, and each style nested in it, as a probe: merged live, and merged flattened. */
export function compositionProbes(
  compositions: Map<string, Composition>,
  handles: Map<string, StyleHandle>
): Map<string, Probe> {
  const merged = (h: StyleHandle) =>
    h.styles.reduce(mergeStyles, {} as StyleObject)
  const probes = new Map<string, Probe>()
  for (const [key, { paths }] of compositions) {
    const composed = paths.map((path) => handles.get(path)!)
    addProbe(
      probes,
      key,
      composed.map(merged).reduce(mergeStyles, {} as StyleObject),
      (classify: Classify) =>
        composed
          .map((h) => merged(flattenHandle(h, classify)))
          .reduce(mergeStyles, {} as StyleObject)
    )
  }
  return probes
}
