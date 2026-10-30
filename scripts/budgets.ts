/**
 * The site's budgets: `vp run budgets`, after `vp run build` and `vp run registry`. Measures the
 * built site (`apps/site/dist/client`) and fails when a measure is over its budget in
 * `budgets.json`. Sizes are gzip at level 9, as Kirana measures its own: a page's JavaScript is
 * every script its prerendered HTML loads or preloads, its stylesheet every `<link rel=stylesheet>`.
 *
 *   bun scripts/budgets.ts            the table, and a failure for anything over budget
 *   bun scripts/budgets.ts --write    the same, then `budgets.json`'s `measured` from this build
 *
 * A budget changes only in the pull request that explains why; `measured` is the last build's
 * value, so a pull request shows what it costs.
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join, relative } from "node:path"
import { gzipSync } from "node:zlib"

const ROOT = new URL("..", import.meta.url).pathname
const CLIENT = join(ROOT, "apps/site/dist/client")
const FILE = join(ROOT, "budgets.json")

type Entry = { budget: number; measured?: number; unit: "KB" | "files" }
type Budgets = Record<string, Entry & { why: string }>

if (!existsSync(join(CLIENT, "index.html"))) {
  console.error("budgets: no apps/site/dist/client; run `vp run build` first")
  process.exit(2)
}

const gzip = (path: string) =>
  gzipSync(readFileSync(path), { level: 9 }).length / 1024

/** The scripts and stylesheets a prerendered page loads, by their URLs. */
function assets(html: string) {
  const scripts = new Set<string>()
  const styles = new Set<string>()
  for (const [, url] of html.matchAll(/<script[^>]*\ssrc="([^"]+\.js)"/g))
    scripts.add(url!)
  for (const [, url] of html.matchAll(
    /<link[^>]*rel="modulepreload"[^>]*href="([^"]+\.js)"/g
  ))
    scripts.add(url!)
  for (const [, url] of html.matchAll(
    /<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"/g
  ))
    styles.add(url!)
  return { scripts, styles }
}

const sum = (urls: Iterable<string>, base = CLIENT) =>
  [...urls].reduce((total, url) => total + gzip(join(base, url)), 0)

/** A page's JavaScript and stylesheet, gzip, from its prerendered HTML. */
function page(htmlPath: string) {
  const { scripts, styles } = assets(
    readFileSync(join(CLIENT, htmlPath), "utf8")
  )
  return { js: sum(scripts), css: sum(styles) }
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const home = page("index.html")
const docs = page("docs.html")
const create = page("create.html")
const blocks = page("blocks/index.html")
const charts = page("charts/area.html")
const colors = page("colors.html")
const typesetPage = page("typeset.html")
// A React preview page (`apps/preview-react`): its stylesheet is every item's, as each framework's.
const preview = page("preview/react/base/dialog-demo.html")
// The Vue preview's stylesheet, as its page links it: a font's loads only when a design names it.
const vueCss = page("preview/vue/index.html").css
// Kirana's compiled stylesheet, every component in every style and every axis value.
const siteCss = readdirSync(join(CLIENT, "assets"))
  .filter((name) => /^stylesheet-.*\.css$/.test(name))
  .reduce((total, name) => total + gzip(join(CLIENT, "assets", name)), 0)
// The registry's items; each docs demo's code (`r/demos`, the panels under the previews) apart.
const DEMOS = join(CLIENT, "r", "demos")
const registryFiles = existsSync(join(CLIENT, "r"))
  ? walk(join(CLIENT, "r")).filter((path) => !path.startsWith(DEMOS))
  : []
const demoFiles = existsSync(DEMOS) ? walk(DEMOS) : []
const allFiles = walk(CLIENT)

/**
 * What a style costs a project: every item's style modules flattened for it on Base UI, the
 * default base, as `kirana-style ui add` writes them for a project in that style, together, gzip.
 * And the design system itself, the `kirana` item: the tokens, the axes, the palettes and the
 * root that puts them on `<html>`.
 */
type Flattened = {
  flattened?: {
    builds: Record<string, Record<string, { content: string }[]>>
  }
}
const kiranaItems = registryFiles
  .filter((path) => /\/r\/[^/]+\.json$/.test(path))
  .map((path) => JSON.parse(readFileSync(path, "utf8")) as Flattened)
const styleCost: Record<string, string> = {}
for (const item of kiranaItems)
  for (const [style, bases] of Object.entries(item.flattened?.builds ?? {}))
    for (const file of bases.base ?? [])
      styleCost[style] = `${styleCost[style] ?? ""}${file.content}\n`
const designSystem = join(CLIENT, "r", "kirana.json")

const measured: Record<string, number> = {
  "home.js": home.js,
  "home.css": home.css,
  "docs.js": docs.js,
  "create.js": create.js,
  "blocks.js": blocks.js,
  "charts.js": charts.js,
  "colors.js": colors.js,
  "typeset.js": typesetPage.js,
  "preview.dialog-demo.js": preview.js,
  "preview-react.css": preview.css,
  "site.css": siteCss,
  "preview-vue.css": vueCss,
  "registry.files": registryFiles.length,
  "registry.bytes":
    registryFiles.reduce((total, path) => total + statSync(path).size, 0) /
    1024,
  "registry.largest":
    Math.max(...registryFiles.map((path) => statSync(path).size)) / 1024,
  "static.files": allFiles.length,
  "demos.bytes":
    demoFiles.reduce((total, path) => total + statSync(path).size, 0) / 1024,
  ...Object.fromEntries(
    Object.entries(styleCost).map(([style, text]) => [
      `style.${style}`,
      gzipSync(text, { level: 9 }).length / 1024,
    ])
  ),
  ...(existsSync(designSystem) ? { "design-system": gzip(designSystem) } : {}),
}

const budgets = JSON.parse(readFileSync(FILE, "utf8")) as Budgets
const rows: string[][] = []
const over: string[] = []
for (const [name, entry] of Object.entries(budgets)) {
  const value = measured[name]
  if (value === undefined) {
    over.push(`${name}: nothing measures it`)
    continue
  }
  const shown = entry.unit === "files" ? String(value) : value.toFixed(1)
  const status = value <= entry.budget ? "ok" : "OVER"
  if (status === "OVER")
    over.push(`${name}: ${shown} ${entry.unit} > ${entry.budget}`)
  rows.push([
    name,
    `${shown} ${entry.unit}`,
    `${entry.budget} ${entry.unit}`,
    status,
  ])
  entry.measured = entry.unit === "files" ? value : Math.round(value * 10) / 10
}
for (const name of Object.keys(measured))
  if (!budgets[name])
    over.push(`${name}: measured but has no budget in budgets.json`)

const widths = [0, 1, 2, 3].map((column) =>
  Math.max(
    ...[["measure", "measured", "budget", ""], ...rows].map(
      (row) => row[column]!.length
    )
  )
)
for (const row of [["measure", "measured", "budget", ""], ...rows])
  console.log(
    row.map((cell, column) => cell.padEnd(widths[column]!)).join("  ")
  )

if (process.argv.includes("--write")) {
  writeFileSync(FILE, `${JSON.stringify(budgets, null, 2)}\n`)
  console.log(`\nbudgets: ${relative(ROOT, FILE)} measured from this build`)
}
if (over.length > 0) {
  console.error(`\nbudgets:\n  ${over.join("\n  ")}`)
  process.exit(1)
}
