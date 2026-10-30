/**
 * The registry's pages against the same pages on shadcn/ui's own site, computed style for computed
 * style, with kirana-lab's harness in URL-pair mode (`docs/workflows.md`, "Against shadcn/ui's own
 * site"): upstream's examples and blocks the site ports, on Base UI and React Aria. A difference not
 * in `conformance/expected-differences.json` fails it.
 *
 *   bun scripts/conformance.ts --pages a,b [--styles nova,lyra|all] [--states] [--shard i/n] [--list]
 *   bun scripts/conformance.ts --changed [--since <ref>] [...]
 *   bun scripts/conformance.ts --all [...]
 *
 * A run compares only the pages it names: what a change concerns, never what an earlier run
 * already compared, unless that is what broke. By default in Nova and at rest; `--styles` adds the
 * styles a change concerns (`all` for the eight) and `--states` opens every state too. `--list`
 * prints the routes and stops.
 *
 * `--changed` (what `vp run conformance:pr` runs) keeps the pages whose own sources import, at any
 * depth, a file changed since `--since` (`origin/main` by default), and stops when more than
 * `MAX_CHANGED` do: name the pages the change concerns with `--pages` instead. `--all` is the
 * whole matrix, for a change that truly reaches every page. `--shard` is the harness's.
 *
 * Upstream's captures are cached between runs (`node_modules/.cache/kirana-ui-conformance`, by the
 * manifest's pin; `CONFORMANCE_CACHE` to move it): upstream needs serving only for a page not
 * captured yet.
 *
 * Needs the site's Worker (`SITE_URL`, default `http://localhost:8787`), upstream's `apps/v4`
 * served at the manifest's commit (`UPSTREAM_URL`, default `http://localhost:4000`), and a
 * kirana-lab checkout with its harness installed (`KIRANA_LAB`, default beside this repository).
 */
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { parseArgs } from "node:util"

const ROOT = join(import.meta.dirname, "..")
const BASES = join(ROOT, "registry", "bases")
const EXPECTED = join(ROOT, "conformance", "expected-differences.json")

/**
 * Each style's code on upstream's site, which reads `?preset=` over any axis parameter: its own
 * `encodePreset({ style })` (`packages/registry/src/preset/preset.ts`). The site reads the same codes.
 */
const PRESETS: Record<string, string> = {
  nova: "b0",
  vega: "bIkeymG",
  lyra: "buFywKm",
  maia: "bbVJxYW",
  mira: "b1D0dv72",
  luma: "b1VlIttI",
  rhea: "b27GcrRo",
  sera: "b1oVxsfY",
}

const { values } = parseArgs({
  allowPositionals: true,
  options: {
    changed: { type: "boolean", default: false },
    all: { type: "boolean", default: false },
    states: { type: "boolean", default: false },
    since: { type: "string" },
    styles: { type: "string" },
    shard: { type: "string" },
    list: { type: "boolean", default: false },
    pages: { type: "string" },
  },
})
const changedFrom = values.changed ? (values.since ?? "origin/main") : undefined

if (!values.pages && !values.changed && !values.all) {
  console.error(
    "conformance: name the pages a change concerns (--pages tabs-example,login-01), or --changed, or --all"
  )
  process.exit(2)
}

/** The most pages `--changed` compares; past it, the run names the pages instead. */
const MAX_CHANGED = 8

const styles = (
  values.styles === "all"
    ? Object.keys(PRESETS)
    : (values.styles?.split(",") ?? ["nova"])
).filter((style) => {
  if (PRESETS[style]) return true
  console.error(`conformance: no upstream code for ${style}`)
  process.exit(2)
})

/** The pages upstream also has: its examples, and the blocks, each with its entry file. */
function pages(base: string) {
  const folder = join(BASES, `react-${base}`)
  const examples = readdirSync(join(folder, "examples"))
    .filter((file) => file.endsWith("-example.tsx"))
    .map((file) => ({
      name: file.replace(/\.tsx$/, ""),
      entry: join(folder, "examples", file),
    }))
  const blocks = readdirSync(join(folder, "blocks")).map((name) => ({
    name,
    entry: join(folder, "blocks", name, "page.tsx"),
  }))
  return [...examples, ...blocks]
}

/** Every registry file a page reaches through relative imports. */
function closure(entry: string, seen = new Set<string>()): Set<string> {
  if (seen.has(entry)) return seen
  seen.add(entry)
  const text = readFileSync(entry, "utf8")
  for (const match of text.matchAll(
    /(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g
  )) {
    const target = resolve(dirname(entry), match[1])
    const file = [
      target,
      ...[".ts", ".tsx", "/index.ts"].map((ext) => target + ext),
    ].find((candidate) => existsSync(candidate) && statSync(candidate).isFile())
    if (file) closure(file, seen)
  }
  return seen
}

function changedFiles(ref: string): string[] | undefined {
  const base = spawnSync("git", ["merge-base", ref, "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
  })
  if (base.status !== 0) return undefined
  const diff = spawnSync("git", ["diff", "--name-only", base.stdout.trim()], {
    cwd: ROOT,
    encoding: "utf8",
  })
  return diff.stdout.split("\n").filter(Boolean)
}

const changed = changedFrom ? changedFiles(changedFrom) : undefined
if (changedFrom && !changed) {
  console.error(`conformance: ${changedFrom} is not a ref here`)
  process.exit(2)
}
const touches = (entry: string) =>
  !changed ||
  [...closure(entry)].some((file) => changed.includes(relative(ROOT, file)))

const routes = (bases: string[], only?: (name: string) => boolean) =>
  bases.flatMap((base) =>
    pages(base)
      .filter(
        (page) =>
          (!only || only(page.name)) &&
          (!values.pages || values.pages.split(",").includes(page.name)) &&
          touches(page.entry)
      )
      .flatMap((page) =>
        styles.map(
          (style) =>
            `/preview/react/${base}/${page.name}?preset=${PRESETS[style]}`
        )
      )
  )

const lab = join(
  process.env.KIRANA_LAB ?? join(ROOT, "..", "kirana-lab"),
  "packages",
  "harness"
)
if (!existsSync(join(lab, "conformance", "compare.ts"))) {
  console.error(`conformance: no kirana-lab harness at ${lab} (set KIRANA_LAB)`)
  process.exit(2)
}
const out =
  process.env.OUT ?? join(process.env.TMPDIR ?? "/tmp", "kirana-ui-conformance")

/**
 * Upstream's captures, kept between runs: upstream is pinned (`upstream/shadcn.json`), so a page
 * captured once at a width, a scheme and a state never needs its server again. The directory is
 * named for the pin (`UPSTREAM_PIN` when the served checkout is another); the harness keys each
 * capture by its own source and Chrome's version too. Passed only to a harness that has the flag.
 */
const pin =
  process.env.UPSTREAM_PIN ??
  [
    ...new Set(
      Object.values(
        (
          JSON.parse(
            readFileSync(join(ROOT, "upstream", "shadcn.json"), "utf8")
          ) as { items: Record<string, { ported: string }> }
        ).items
      ).map((item) => item.ported)
    ),
  ]
    .sort()
    .join("-")
const cache =
  process.env.CONFORMANCE_CACHE ??
  join(
    ROOT,
    "node_modules",
    ".cache",
    "kirana-ui-conformance",
    `upstream-${pin}`
  )
const caching = readFileSync(
  join(lab, "conformance", "compare.ts"),
  "utf8"
).includes("--expected-cache")

function compare(name: string, paths: string[], ...options: string[]) {
  if (paths.length === 0) return true
  console.log(`\n== ${name}: ${paths.length} route(s)`)
  const result = spawnSync(
    "bun",
    [
      "conformance/compare.ts",
      "--actual",
      process.env.SITE_URL ?? "http://localhost:8787",
      "--expected",
      process.env.UPSTREAM_URL ?? "http://localhost:4000",
      "--label",
      "upstream",
      "--expected-path",
      "/preview/react/=/preview/",
      "--group",
      '[data-slot="example"]',
      "--expected-differences",
      EXPECTED,
      "--paths",
      paths.join(","),
      "--out",
      join(out, `${name}.json`),
      ...(values.shard ? ["--shard", values.shard] : []),
      ...(caching ? ["--expected-cache", cache] : []),
      ...options,
    ],
    {
      cwd: lab,
      stdio: "inherit",
      env: {
        ...process.env,
        KIRANA_CHROME_CHANNEL: process.env.KIRANA_CHROME_CHANNEL ?? "chrome",
      },
    }
  )
  return result.status === 0
}

const all = routes(["base", "aria"])
if (values.list) {
  console.log(all.join("\n"))
  process.exit(0)
}
if (all.length === 0) {
  console.log("conformance: no page reaches a changed file")
  process.exit(0)
}
const named = new Set(all.map((route) => route.split("/")[4]!.split("?")[0]))
if (values.changed && !values.all && named.size > MAX_CHANGED) {
  console.error(
    `conformance: the change reaches ${named.size} pages (${[...named].join(", ")}); compare the ones it concerns with --pages, or every page with --all`
  )
  process.exit(2)
}
// React Aria's DialogTrigger and MenuTrigger render no element: its overlays open from the first
// button in an example.
const passes = !values.states
  ? [compare("rest", all)]
  : [
      compare("rest", all),
      compare("states", all, "--states"),
      compare(
        "aria-dialogs",
        routes(["aria"], (name) => name === "dialog-example"),
        "--states",
        "dialog-open",
        "--trigger",
        'dialog-open=[data-slot="example-content"] button'
      ),
      compare(
        "aria-dropdowns",
        routes(["aria"], (name) => name === "dropdown-menu-example"),
        "--states",
        "dropdown-open,dropdown-row-highlighted",
        "--trigger",
        'dropdown-open=[data-slot="example-content"] button',
        "--trigger",
        'dropdown-row-highlighted=[data-slot="example-content"] button'
      ),
    ]
process.exit(passes.every(Boolean) ? 0 : 1)
