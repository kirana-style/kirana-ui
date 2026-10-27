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
const preview = page("preview/react/base/dialog-demo.html")
const vueCss = readdirSync(join(CLIENT, "preview/vue/assets"))
  .filter((name) => name.endsWith(".css"))
  .reduce(
    (total, name) => total + gzip(join(CLIENT, "preview/vue/assets", name)),
    0
  )
// Kirana's compiled stylesheet, every component in every style and every axis value.
const siteCss = readdirSync(join(CLIENT, "assets"))
  .filter((name) => /^stylesheet-.*\.css$/.test(name))
  .reduce((total, name) => total + gzip(join(CLIENT, "assets", name)), 0)
const registryFiles = existsSync(join(CLIENT, "r"))
  ? walk(join(CLIENT, "r"))
  : []
const allFiles = walk(CLIENT)

const measured: Record<string, number> = {
  "home.js": home.js,
  "home.css": home.css,
  "docs.js": docs.js,
  "create.js": create.js,
  "preview.dialog-demo.js": preview.js,
  "site.css": siteCss,
  "preview-vue.css": vueCss,
  "registry.files": registryFiles.length,
  "registry.bytes":
    registryFiles.reduce((total, path) => total + statSync(path).size, 0) /
    1024,
  "registry.largest":
    Math.max(...registryFiles.map((path) => statSync(path).size)) / 1024,
  "static.files": allFiles.length,
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
