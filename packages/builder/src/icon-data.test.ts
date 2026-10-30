import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vite-plus/test"

import phosphor from "../../../registry/icons/phosphor"
import remixicon from "../../../registry/icons/remixicon"
import tabler from "../../../registry/icons/tabler"

const ROOT = join(import.meta.dirname, "..", "..", "..")

/** Every source file a placeholder can be in, as `scripts/icon-data.ts` reads them. */
function files(folder: string): string[] {
  return readdirSync(folder).flatMap((name) => {
    if (name === "node_modules" || name === "dist" || name.startsWith("."))
      return []
    const path = join(folder, name)
    if (statSync(path).isDirectory()) return files(path)
    return /\.(tsx|ts|vue|svelte)$/.test(name) ? [path] : []
  })
}

const sources = ["registry", "apps/site/src", "apps/preview-react/src"]
  .flatMap((folder) => files(join(ROOT, folder)))
  .map((file) => readFileSync(file, "utf8"))

/** The names placeholders give a library. */
const namesFor = (library: string) =>
  new Set(
    sources.flatMap((text) =>
      [...text.matchAll(new RegExp(`\\b${library}="([A-Za-z0-9]+)"`, "g"))].map(
        (match) => match[1]!
      )
    )
  )

describe("the icon data loaded on demand", () => {
  it.each([
    ["tabler", tabler],
    ["phosphor", phosphor],
    ["remixicon", remixicon],
  ] as const)(
    "draws every icon a placeholder names in %s (`bun scripts/icon-data.ts` writes them)",
    (library, data) => {
      const missing = [...namesFor(library)].filter(
        (name) => !(name in data.icons)
      )
      expect(missing).toEqual([])
    }
  )
})
