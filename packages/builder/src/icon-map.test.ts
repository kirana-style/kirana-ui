import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vite-plus/test"

import { resolveIcon } from "../../../registry/icons/data"

const ROOT = join(import.meta.dirname, "..", "..", "..", "registry")

/** Every source file a placeholder may sit in, every framework's. */
function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name: string) => {
    const path = join(dir, name)
    if (name === "node_modules" || name === "icons") return []
    if (statSync(path).isDirectory()) return sources(path)
    return /\.(tsx?|vue|svelte)$/.test(name) ? [path] : []
  })
}

/** The names placeholders give `library`, as attributes or object keys: `lucide="ChevronDownIcon"`. */
function namesFor(library: "lucide" | "hugeicons") {
  // Not `:hugeicons="name"`, a Vue binding: its value is an expression, not an icon's name.
  const pattern = new RegExp(
    `(?<![:\\w-])${library}(?:=|:\\s*)"([A-Za-z0-9]+)"`,
    "g"
  )
  const names = new Map<string, string>()
  for (const file of sources(ROOT))
    for (const [, name] of readFileSync(file, "utf8").matchAll(pattern))
      if (!names.has(name)) names.set(name, file.slice(ROOT.length + 1))
  return names
}

// Lucide and Hugeicons are listed by hand in `data.ts`; an icon a placeholder names but the map
// lacks draws nothing (Lucide is the default design's library).
describe("the icon map", () => {
  for (const library of ["lucide", "hugeicons"] as const) {
    it(`has every ${library} icon a placeholder names`, () => {
      const missing = [...namesFor(library)].filter(
        ([name]) => resolveIcon(library, { [library]: name }) === null
      )
      expect(missing.map(([name, file]) => `${name} (${file})`)).toEqual([])
    })
  }
})
