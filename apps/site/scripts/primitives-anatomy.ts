/**
 * Writes `primitives/anatomy.json`: each primitive as it is written on each framework, cut from
 * the fixtures the primitives' conformance run plays, so every snippet is code that runs and is
 * tested. Run by hand when the `@kirana-ui/*` version moves, beside a checkout of
 * https://github.com/kirana-style/primitives at that version:
 *
 *   bun scripts/primitives-anatomy.ts ../../../primitives
 */
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { components } from "./primitives-data.ts"

const root = process.argv[2]
if (!root)
  throw new Error(
    "usage: bun scripts/primitives-anatomy.ts <primitives checkout>"
  )

const SOURCES = {
  react: ["fixtures/react/src/App.tsx", "fixtures/react/src/Open.tsx"],
  vue: ["fixtures/vue/src/App.vue"],
  svelte: ["fixtures/svelte/src/App.svelte"],
  solid: ["fixtures/solid/src/App.tsx"],
  angular: ["fixtures/angular/src/app.ts"],
  web: ["fixtures/web/index.html"],
} as const
type Framework = keyof typeof SOURCES

/** A text as a pattern that matches only itself: every character a pattern reads, the backslash too. */
const literal = (text: string) => text.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")

const VOID = new Set(["input", "img", "br", "hr"])

/** Where a start tag ends, and whether it closes itself: quotes and braces may hold a `>`. */
function startTagEnd(
  text: string,
  from: number
): { end: number; closed: boolean } {
  let quote = ""
  let depth = 0
  for (let at = from; at < text.length; at++) {
    const char = text[at]!
    if (quote) {
      if (char === quote) quote = ""
    } else if (char === '"' || char === "'" || char === "`") quote = char
    else if (char === "{") depth++
    else if (char === "}") depth--
    else if (char === ">" && depth === 0)
      return { end: at + 1, closed: text[at - 1] === "/" }
  }
  throw new Error("a start tag that does not end")
}

/** The element that starts at `start`, whole. */
function element(text: string, start: number): string {
  const tag = /^<([\w.-]+)/.exec(text.slice(start))![1]!
  const first = startTagEnd(text, start)
  if (first.closed || VOID.has(tag)) return text.slice(start, first.end)
  const escaped = literal(tag)
  const either = new RegExp(`<${escaped}(?=[\\s>/])|</${escaped}\\s*>`, "g")
  either.lastIndex = first.end
  let depth = 1
  for (let found = either.exec(text); found; found = either.exec(text)) {
    if (found[0].startsWith("</")) {
      if (--depth === 0) return text.slice(start, found.index + found[0].length)
    } else {
      const inner = startTagEnd(text, found.index)
      if (!inner.closed) depth++
      either.lastIndex = inner.end
    }
  }
  throw new Error(`<${tag}> is not closed`)
}

/** Without what the fixture is found by, and from its own left edge. */
function tidy(snippet: string, indent: number): string {
  let out = ""
  for (let at = 0; at < snippet.length;) {
    const marked = /^\s+(?:\[attr\.data-testid\]|:?data-testid)=/.exec(
      snippet.slice(at)
    )
    if (!marked) {
      out += snippet[at++]
      continue
    }
    // The attribute's value: quoted, or in braces.
    let end = at + marked[0].length
    const open = snippet[end]!
    if (open === "{") {
      let depth = 0
      do {
        if (snippet[end] === "{") depth++
        if (snippet[end] === "}") depth--
        end++
      } while (depth > 0)
    } else end = snippet.indexOf(open, end + 1) + 1
    at = end
  }
  return out
    .split("\n")
    .map((line, at) =>
      at === 0 ? line : line.slice(Math.min(indent, line.search(/\S|$/)))
    )
    .filter((line) => line.trim() !== "")
    .join("\n")
    .replace(/\n\s*(\/?>)/g, (whole, close: string) =>
      /^\n\s*\/?>$/.test(whole) ? close : whole
    )
}

/**
 * Without the id the fixture gives its component, which only its tests read: a page that draws
 * the component twice would have one id on two elements. The component makes its own.
 */
const ownId = (snippet: string) =>
  snippet.replace(
    /^(<[\w.-]+(?:\s+[\w-]+)?)\s+(?:id|kui-id|\[kpId\])="[^"]*"/,
    "$1"
  )

function find(
  framework: Framework,
  markers: readonly RegExp[]
): string | undefined {
  for (const file of SOURCES[framework]) {
    const text = readFileSync(join(root!, file), "utf8")
    for (const marker of markers) {
      const found = marker.exec(text)
      if (!found) continue
      const start = text.lastIndexOf(
        "<",
        found.index + (found[0].startsWith("<") ? 0 : -1)
      )
      const from = found[0].startsWith("<") ? found.index : start
      const lineStart = text.lastIndexOf("\n", from) + 1
      return ownId(tidy(element(text, from), from - lineStart))
    }
  }
  return undefined
}

/**
 * The example to take where the first in the fixtures is not the one that shows the component
 * best: by the id the fixtures give it.
 */
const PREFER: Record<string, string> = { Field: "fd1" }

const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (letter, at) => (at ? "-" : "") + letter.toLowerCase())

const anatomy: Record<string, Partial<Record<Framework, string>>> = {}
const missing: string[] = []
for (const { name, first } of components()) {
  const tag = first ?? name
  const id = PREFER[name]
  const jsx = [
    ...(id ? [new RegExp(`<${literal(tag)}\\s[^>]*id="${id}"`)] : []),
    new RegExp(`<${literal(tag)}(?=[\\s>/])`),
  ]
  const directive = (suffix: string) =>
    new RegExp(`\\skp${name}${suffix}(?=[\\s=>\\]/])`)
  const entry: Partial<Record<Framework, string>> = {
    react: find("react", jsx),
    vue: find("vue", jsx),
    svelte: find("svelte", jsx),
    solid: find("solid", jsx),
    angular: find("angular", [
      ...(id ? [new RegExp(`\\skp${name}\\s[^>]*\\[kpId\\]="'${id}'"`)] : []),
      ...["", "Root", "Group", "Viewport", "Textarea", "Trigger"].map(
        (suffix) => directive(suffix)
      ),
    ]),
    web: find("web", [
      ...(id ? [new RegExp(`<kui-${kebab(name)}\\s[^>]*kui-id="${id}"`)] : []),
      new RegExp(`<kui-${kebab(name)}(?=[\\s>])`),
    ]),
  }
  for (const framework of Object.keys(SOURCES) as Framework[])
    if (!entry[framework]) missing.push(`${name} on ${framework}`)
  anatomy[kebab(name)] = entry
}
writeFileSync(
  new URL("../primitives/anatomy.json", import.meta.url),
  `${JSON.stringify(anatomy, null, 2)}\n`
)
console.log(`${Object.keys(anatomy).length} components`)
if (missing.length) console.log(`not found: ${missing.join(", ")}`)
