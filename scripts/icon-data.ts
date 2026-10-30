/**
 * Writes the icon data the site draws Tabler, Phosphor and Remix Icon with (`registry/icons/
 * tabler.ts`, `phosphor.ts`, `remixicon.ts`): for every name a placeholder in the sources gives the
 * library, its shapes, read from the library's published files at a pinned version, under the
 * notice each library's licence asks a copy to keep (\`--headers\` rewrites only those). Lucide and
 * Hugeicons come from their packages (`registry/icons/data.ts`). Run it when a placeholder names an
 * icon the data lacks: `bun scripts/icon-data.ts`; `--check` only reports what is missing.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = join(import.meta.dirname, "..")
const SOURCES = ["registry", "apps/site/src", "apps/preview-react/src"]
const EXTENSIONS = [".tsx", ".ts", ".vue", ".svelte"]

const TABLER = "https://cdn.jsdelivr.net/npm/@tabler/icons@3.50.0"
const PHOSPHOR = "https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1"
const REMIX = "remixicon@4.9.1"

const TABLER_LICENSE = `MIT License

Copyright (c) 2020-2026 Paweł Kuna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

const PHOSPHOR_LICENSE = `MIT License

Copyright (c) 2023 Phosphor Icons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

type Node = [string, Record<string, string>]

/** Every file under a folder, but dependencies and output. */
function files(folder: string): string[] {
  return readdirSync(folder).flatMap((name) => {
    if (name === "node_modules" || name === "dist" || name.startsWith("."))
      return []
    const path = join(folder, name)
    if (statSync(path).isDirectory()) return files(path)
    return EXTENSIONS.some((extension) => name.endsWith(extension))
      ? [path]
      : []
  })
}

/** The names placeholders give a library, sorted. */
function namesFor(library: string): string[] {
  const names = new Set<string>()
  const pattern = new RegExp(`\\b${library}="([A-Za-z0-9]+)"`, "g")
  for (const folder of SOURCES)
    for (const file of files(join(ROOT, folder)))
      for (const match of readFileSync(file, "utf8").matchAll(pattern))
        names.add(match[1]!)
  return [...names].sort()
}

/** `RotateClockwise2` → `rotate-clockwise-2`. */
const kebab = (name: string) =>
  name
    .replace(/([a-z])([A-Z0-9])/g, "$1-$2")
    .replace(/([0-9])([A-Za-z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()

/** A file's text, retried twice; a missing file fails at once. */
async function text(url: string, tries = 3): Promise<string> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
    if (response.status === 404) throw new Error(`${url}: 404`)
    if (!response.ok) throw new Error(`${url}: ${response.status}`)
    return await response.text()
  } catch (error) {
    if (tries <= 1 || String(error).includes(": 404")) throw error
    return text(url, tries - 1)
  }
}

/** Runs `task` over `items`, eight at a time. */
async function pooled<T>(
  items: readonly T[],
  task: (item: T) => Promise<void>
) {
  const queue = [...items]
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      for (let item = queue.shift(); item !== undefined; item = queue.shift())
        await task(item)
    })
  )
}

/** An SVG file's shapes, the children of its root, as `[tag, attributes]`. */
function shapes(svg: string): Node[] {
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
  return [...inner.matchAll(/<([a-z]+)\b([^>]*?)\/?>/g)]
    .filter(([, tag]) => tag !== "title")
    .map(([, tag, attributes]): Node => [
      tag!,
      Object.fromEntries(
        [...attributes!.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map(
          ([, key, value]) => [key!, value!]
        )
      ),
    ])
}

type Generated = {
  svg: Record<string, string | number>
  icons: Record<string, Node[]>
  missing: string[]
}

async function tabler(names: string[]): Promise<Generated> {
  const outline = JSON.parse(
    await text(`${TABLER}/tabler-nodes-outline.json`)
  ) as Record<string, Node[]>
  const filled = JSON.parse(
    await text(`${TABLER}/tabler-nodes-filled.json`)
  ) as Record<string, Node[]>
  const icons: Record<string, Node[]> = {}
  const missing: string[] = []
  for (const name of names) {
    const bare = name.replace(/^Icon/, "")
    const solid = bare.endsWith("Filled")
    const key = kebab(solid ? bare.slice(0, -"Filled".length) : bare)
    const nodes = (solid ? filled : outline)[key]
    if (!nodes) missing.push(name)
    // A filled icon is drawn in its colour, inside the outline set's stroked `<svg>`.
    else
      icons[name] = solid
        ? nodes.map(([tag, attributes]) => [
            tag,
            { ...attributes, fill: "currentColor", stroke: "none" },
          ])
        : nodes
  }
  return {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    },
    icons,
    missing,
  }
}

/** Names `@phosphor-icons/react` keeps as aliases of icons Phosphor 2 renamed. */
const PHOSPHOR_ALIASES: Record<string, string> = {
  Activity: "Pulse",
  FileSearch: "FileMagnifyingGlass",
}

async function phosphor(names: string[]): Promise<Generated> {
  const icons: Record<string, Node[]> = {}
  const missing: string[] = []
  await pooled(names, async (name) => {
    const bare = name.replace(/Icon$/, "")
    const file = kebab(PHOSPHOR_ALIASES[bare] ?? bare)
    try {
      icons[name] = shapes(await text(`${PHOSPHOR}/assets/regular/${file}.svg`))
    } catch {
      missing.push(name)
    }
  })
  return {
    svg: { viewBox: "0 0 256 256", fill: "currentColor" },
    icons,
    missing,
  }
}

async function remixicon(names: string[]): Promise<Generated> {
  const listing = JSON.parse(
    await text(
      `https://data.jsdelivr.com/v1/packages/npm/${REMIX}?structure=flat`
    )
  ) as { files: { name: string }[] }
  const paths = new Map(
    listing.files
      .map((file) => file.name)
      .filter((path) => path.startsWith("/icons/") && path.endsWith(".svg"))
      .map((path) => [path.split("/").at(-1)!.slice(0, -4), path])
  )
  const icons: Record<string, Node[]> = {}
  const missing: string[] = []
  await pooled(names, async (name) => {
    const path = paths.get(kebab(name.replace(/^Ri/, "")))
    if (!path) return void missing.push(name)
    icons[name] = shapes(
      await text(`https://cdn.jsdelivr.net/npm/${REMIX}${path}`)
    )
  })
  return {
    svg: { viewBox: "0 0 24 24", fill: "currentColor" },
    icons,
    missing,
  }
}

/**
 * Each library: where its data comes from, and the notice its licence asks a copy to keep. Tabler's
 * and Phosphor's are MIT, whose notice travels with any substantial copy; Remix Icon's own licence
 * (v1.0, not the Apache-2.0 its package metadata names) allows its icons in a design system's
 * interface and asks to keep its copyright notice and link the licence.
 */
const LIBRARIES = {
  tabler: {
    generate: tabler,
    source: "@tabler/icons 3.50.0, outline",
    notice: `Tabler Icons, https://github.com/tabler/tabler-icons

${TABLER_LICENSE}`,
  },
  phosphor: {
    generate: phosphor,
    source: "@phosphor-icons/core 2.1.1, regular",
    notice: `Phosphor Icons, https://github.com/phosphor-icons/core

${PHOSPHOR_LICENSE}`,
  },
  remixicon: {
    generate: remixicon,
    source: "remixicon 4.9.1",
    notice: `Remix Icon, https://remixicon.com
Copyright (c) 2017–2026 Remix Design

Under the Remix Icon License v1.0:
https://github.com/Remix-Design/RemixIcon/blob/master/License
Used here as interface icons of a design system (its section 2.3), not as an icon
library of its own (section 3).`,
  },
} as const

/** A data file's header: what it is, then the library's notice. */
const header = (library: string, source: string, notice: string) => `/**
 * ${library}'s shapes for every name the registry's placeholders give it, from ${source}.
 * Generated by \`scripts/icon-data.ts\`; loaded only when a design draws ${library}
 * (\`loadIconLibrary\` in \`data.ts\`).
 *
${notice
  .split("\n")
  .map((line) => (line ? ` * ${line}` : " *"))
  .join("\n")}
 */`

const check = process.argv.includes("--check")

// `--headers`: rewrites the data files' headers alone, with no download.
if (process.argv.includes("--headers")) {
  for (const [library, { source, notice }] of Object.entries(LIBRARIES)) {
    const path = join(ROOT, `registry/icons/${library}.ts`)
    const file = readFileSync(path, "utf8")
    writeFileSync(
      path,
      file.replace(/^\/\*\*[\s\S]*?\*\//, header(library, source, notice))
    )
  }
  process.exit(0)
}

let failed = false
for (const [library, { generate, source, notice }] of Object.entries(
  LIBRARIES
)) {
  const names = namesFor(library)
  const { svg, icons, missing } = await generate(names)
  if (missing.length) {
    failed = true
    console.error(`${library}: no data for ${missing.sort().join(", ")}`)
  }
  console.log(
    `${library}: ${Object.keys(icons).length} of ${names.length} icons`
  )
  if (check) continue
  const sorted = Object.fromEntries(
    Object.entries(icons).sort(([left], [right]) => left.localeCompare(right))
  )
  writeFileSync(
    join(ROOT, `registry/icons/${library}.ts`),
    `${header(library, source, notice)}
import type { IconLibraryData } from "./data"

export default ${JSON.stringify({ svg, icons: sorted })} satisfies IconLibraryData
`
  )
}
if (failed) process.exitCode = 1
