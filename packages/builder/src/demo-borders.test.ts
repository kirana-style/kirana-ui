import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vite-plus/test"

/**
 * Upstream's base layer gives every border `border-border`; the registry's reset cannot (Kirana
 * hashes its variables' names), so a style that draws a border names its colour, or the border is
 * `currentColor`. The comparison with upstream's site catches one at rest, not inside a popup it
 * does not open (the sidebar demo's team switcher drew white boxes). The components' own style
 * modules are left out: their colour often comes from another handle composed with it.
 */
const ROOT = join(import.meta.dirname, "..", "..", "..", "registry", "bases")

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name: string) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === "ui" ? [] : sources(path)
    return /\.(tsx|vue|svelte)$/.test(name) ? [path] : []
  })
}

/** Each `name: css({ … })` of a file, its body and line. */
function handles(source: string) {
  const found: { name: string; body: string; line: number }[] = []
  for (const match of source.matchAll(/(\w+):\s*css\(\s*\{/g)) {
    const start = match.index + match[0].length - 1
    let depth = 0
    for (let index = start; index < source.length; index++) {
      if (source[index] === "{") depth++
      else if (source[index] === "}" && --depth === 0) {
        found.push({
          name: match[1]!,
          body: source.slice(start, index + 1),
          line: source.slice(0, match.index).split("\n").length,
        })
        break
      }
    }
  }
  return found
}

/**
 * Whether the handle styles a plain element (`<div sx={styles.box}>`, `<div :sx="…">`): on a
 * registry component (`<AccordionItem sx={styles.item}>`) the component's own style gives the
 * colour, and the handle only adds to it.
 */
function onElement(source: string, name: string) {
  const uses = source.matchAll(
    new RegExp(`<([A-Za-z][\\w.-]*)[^<>]*?\\bstyles\\.${name}\\b`, "g")
  )
  return [...uses].some(([, tag]) => /^[a-z]/.test(tag!))
}

const SIDE =
  "(?:Top|Right|Bottom|Left|Inline|Block|InlineStart|InlineEnd|BlockStart|BlockEnd)?"
const width = new RegExp(
  `border${SIDE}Width\\s*:\\s*(\\{[^}]*\\}|[^,}\\n]+)`,
  "g"
)
const color = new RegExp(`border${SIDE}Color\\s*:`)

describe("the demos' borders", () => {
  it("name their colour wherever they draw one", () => {
    const uncoloured: string[] = []
    for (const file of sources(ROOT)) {
      const source = readFileSync(file, "utf8")
      for (const { name, body, line } of handles(source)) {
        const widths = [...body.matchAll(width)].map(([, value]) =>
          value!.trim()
        )
        // A width of 0 (a visually hidden label) draws nothing.
        const draws = widths.some((value) =>
          /"[1-9]|"0?\.\d|space\[|spacing\(/.test(value)
        )
        if (draws && !color.test(body) && onElement(source, name))
          uncoloured.push(`${file.slice(ROOT.length + 1)}:${line} ${name}`)
      }
    }
    expect(uncoloured).toEqual([])
  })
})
