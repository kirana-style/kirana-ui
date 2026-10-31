/**
 * `vp run upstream -- <scan | accept> [<item>…] [--ref <commit>] [--repo <path>]`: the provenance
 * manifest against shadcn/ui's repository (`upstream.ts`).
 *
 * - `scan` compares every ported item's units at `--ref` (default `main`) with the manifest and
 *   writes `upstream/report.md` and `upstream/report.json`: what changed, with each changed class
 *   list's utilities added and removed and a draft of the added ones in Kirana's syntax (Kirana's
 *   Tailwind lowering, a suggestion never written into a source); items not stamped; hooks with no
 *   place; upstream components and styles not ported. It exits non-zero on nothing: the report is
 *   for a person.
 * - `accept` stamps the named items (every ported item when none is named) at `--ref` (default the
 *   manifest's commit, or `main`), once their port is done and conformance passes. It refuses an item
 *   with a hook that has no place and no reason to be dropped (`dropped` in its entry).
 *
 * `--repo` (or `UPSTREAM_REPO`) is a git checkout of shadcn/ui; without one, a blobless clone in
 * `node_modules/.cache/upstream` is made or fetched.
 */
import { spawnSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { parseArgs } from "node:util"

import { Driver } from "@kirana-style/compiler"
import scales from "@kirana-style/preset-scales/preset"

import { ITEMS, STYLES } from "./items"
import type { Manifest, Ported } from "./upstream"
import {
  APP_FILES,
  REPOSITORY,
  Upstream,
  V4,
  classDiff,
  filesOf,
  placeHooks,
  registryHooks,
  rulesOf,
  unitsOf,
} from "./upstream"

const ROOT = join(import.meta.dir, "..", "..", "..")
const REGISTRY = join(ROOT, "registry")
const MANIFEST = join(ROOT, "upstream", "shadcn.json")

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { ref: { type: "string" }, repo: { type: "string" } },
})
const [command, ...named] = positionals

function repository(): string {
  const given = values.repo ?? process.env.UPSTREAM_REPO
  if (given) return given
  const cache = join(ROOT, "node_modules", ".cache", "upstream")
  const git = (args: string[], cwd?: string) => {
    const result = spawnSync("git", args, { cwd, stdio: "inherit" })
    if (result.status !== 0) throw new Error(`upstream: git ${args[0]} failed`)
  }
  if (!existsSync(join(cache, ".git"))) {
    mkdirSync(cache, { recursive: true })
    git([
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      `https://github.com/${REPOSITORY}.git`,
      cache,
    ])
  } else git(["fetch", "--filter=blob:none", "origin", "main"], cache)
  return cache
}

const read = (): Manifest =>
  existsSync(MANIFEST)
    ? (JSON.parse(readFileSync(MANIFEST, "utf8")) as Manifest)
    : { repository: REPOSITORY, items: {} }

/**
 * Every item the registry ported: its components and blocks, the site's example pages, and what
 * came from upstream's site (`APP_FILES`).
 */
function portedItems(upstream: Upstream, ref: string): Ported[] {
  const components = ITEMS.filter(
    (item) =>
      item.type === "registry:ui" &&
      !item.kiranaOnly &&
      !item.name.endsWith("-styles")
  )
    .map((item): Ported => ({ name: item.name, kind: "component" }))
    .filter((item) => filesOf(upstream, ref, item).length > 0)
  const blocks = ITEMS.filter((item) => item.type === "registry:block").map(
    (item): Ported => ({
      name: item.name,
      kind: item.name.startsWith("chart-") ? "chart" : "block",
    })
  )
  const examples = readdirSync(
    join(REGISTRY, "bases", "react-base", "examples")
  )
    // The `-example` pages, and `demo`, upstream's page of every control that its v0 export opens.
    .filter((file) => file.endsWith("-example.tsx") || file === "demo.tsx")
    .map((file): Ported => ({
      name: file.replace(/\.tsx$/, ""),
      kind: "example",
    }))
  const app = Object.keys(APP_FILES).map((name): Ported => ({
    name,
    kind: "app",
  }))
  return [...components, ...examples, ...blocks, ...app].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

const upstream = new Upstream(repository())
const manifest = read()
const places = registryHooks(REGISTRY)

if (command === "accept") {
  const ref = upstream.commit(
    values.ref ?? Object.values(manifest.items)[0]?.ported ?? "main"
  )
  const items = portedItems(upstream, ref).filter(
    (item) => named.length === 0 || named.includes(item.name)
  )
  const refused: string[] = []
  for (const item of items) {
    const { units, hooks } = unitsOf(upstream, ref, item, STYLES)
    const previous = manifest.items[item.name]
    const { placed, unmapped } = placeHooks(hooks, places)
    const missing = unmapped.filter((hook) => !previous?.dropped?.[hook])
    if (missing.length) {
      refused.push(
        `${item.name}: no place for ${missing.join(", ")} (a \`// cn-…\` comment in a style module, or \`dropped\` with a reason)`
      )
      continue
    }
    manifest.items[item.name] = {
      ported: ref,
      units,
      hooks: placed,
      ...(previous?.dropped ? { dropped: previous.dropped } : {}),
      ...(previous?.deviations ? { deviations: previous.deviations } : {}),
    }
  }
  manifest.items = Object.fromEntries(
    Object.entries(manifest.items).sort(([a], [b]) => a.localeCompare(b))
  )
  mkdirSync(join(ROOT, "upstream"), { recursive: true })
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(
    `upstream: ${items.length - refused.length} item(s) stamped at ${ref}`
  )
  if (refused.length) {
    console.error(refused.join("\n"))
    process.exit(1)
  }
} else if (command === "scan") {
  const ref = values.ref ?? "main"
  const sha = upstream.commit(ref)
  const items = portedItems(upstream, sha)
  let lowering: Driver | undefined
  const draft = async (utilities: string[]) => {
    lowering ??= await Driver.create({
      root: REGISTRY,
      // The lowering's grammar: the preset's scales and the registry's colours. Only the drafts read it.
      config: {
        presets: [scales()],
        utilities: {
          scales: { color: [{ module: "./core/tokens.ts", export: "theme" }] },
        },
      },
    })
    return lowering.lowerTailwind(utilities.join(" ")).style
  }

  type Change = {
    item: string
    unit: string
    removed?: string[]
    added?: string[]
    draft?: string | null
    place?: string
  }
  const changed: Change[] = []
  const unstamped: string[] = []
  const unmapped: { item: string; hooks: string[] }[] = []
  for (const item of items) {
    const entry = manifest.items[item.name]
    const { units, hooks } = unitsOf(upstream, sha, item, STYLES)
    const missing = placeHooks(hooks, places).unmapped.filter(
      (hook) => !entry?.dropped?.[hook]
    )
    if (missing.length) unmapped.push({ item: item.name, hooks: missing })
    if (!entry) {
      unstamped.push(item.name)
      continue
    }
    for (const unit of new Set([
      ...Object.keys(units),
      ...Object.keys(entry.units),
    ])) {
      if (units[unit] === entry.units[unit]) continue
      const [path, hook] = unit.split("#")
      if (!hook) {
        changed.push({ item: item.name, unit })
        continue
      }
      const before =
        rulesOf(upstream.read(entry.ported, path) ?? "").get(hook) ?? ""
      const after = rulesOf(upstream.read(sha, path) ?? "").get(hook) ?? ""
      const { added, removed } = classDiff(before, after)
      changed.push({
        item: item.name,
        unit,
        added,
        removed,
        draft: added.length ? await draft(added) : undefined,
        place: entry.hooks[hook],
      })
    }
  }

  const since = Object.values(manifest.items)[0]?.ported ?? sha
  const names = (at: string) =>
    upstream
      .list(at, `${V4}/bases/base/ui`)
      .map((path) => /\/([^/]+)\.tsx$/.exec(path)?.[1])
      .filter((name): name is string => Boolean(name))
  const styles = (at: string) =>
    upstream
      .list(at, `${V4}/styles`)
      .map((path) => /style-([a-z]+)\.css$/.exec(path)?.[1])
      .filter((name): name is string => Boolean(name))
  const ported = new Set(items.map((item) => item.name))
  const newItems = names(sha).filter((name) => !names(since).includes(name))
  const removedItems = [...ported].filter(
    (name) =>
      manifest.items[name] &&
      filesOf(upstream, sha, {
        name,
        kind: items.find((i) => i.name === name)!.kind,
      }).length === 0
  )
  const notPorted = names(sha).filter((name) => !ported.has(name))
  const newStyles = styles(sha).filter(
    (style) => !styles(since).includes(style)
  )
  const otherStyles = styles(sha).filter(
    (style) => !(STYLES as readonly string[]).includes(style)
  )

  const report = {
    ref,
    commit: sha,
    since,
    changed,
    unstamped,
    unmapped,
    newItems,
    removedItems,
    notPorted,
    newStyles,
    otherStyles,
  }
  const lines = [
    `# Upstream ${ref} @ ${sha}, against the ported units (stamped at ${since})`,
    "",
    `## Changed (${changed.length})`,
    ...changed.flatMap((change) => [
      `- ${change.item}: \`${change.unit.replace(`${V4}/`, "")}\`${change.place ? ` → \`${change.place}\`` : ""}`,
      ...(change.removed?.length
        ? [`  - removed: \`${change.removed.join(" ")}\``]
        : []),
      ...(change.added?.length
        ? [`  - added: \`${change.added.join(" ")}\``]
        : []),
      ...(change.draft
        ? [
            "",
            "    ```ts",
            ...change.draft.split("\n").map((line) => `    ${line}`),
            "    ```",
          ]
        : []),
    ]),
    "",
    `## Not stamped (${unstamped.length})`,
    ...(unstamped.length ? [unstamped.join(", ")] : []),
    "",
    `## Hooks with no place (${unmapped.reduce((n, u) => n + u.hooks.length, 0)})`,
    ...unmapped.map((u) => `- ${u.item}: ${u.hooks.join(", ")}`),
    "",
    `## Upstream components`,
    `- new since ${since} (${newItems.length}): ${newItems.join(", ") || "none"}`,
    `- removed (${removedItems.length}): ${removedItems.join(", ") || "none"}`,
    `- not ported yet (${notPorted.length}): ${notPorted.join(", ")}`,
    "",
    `## Styles`,
    `- new since ${since}: ${newStyles.join(", ") || "none"}`,
    `- not in the registry yet: ${otherStyles.join(", ") || "none"}`,
    "",
  ]
  mkdirSync(join(ROOT, "upstream"), { recursive: true })
  writeFileSync(join(ROOT, "upstream", "report.md"), lines.join("\n"))
  writeFileSync(
    join(ROOT, "upstream", "report.json"),
    `${JSON.stringify(report, null, 2)}\n`
  )
  console.log(
    `upstream: ${ref} @ ${sha}; ${changed.length} changed, ${unstamped.length} not stamped, ${unmapped.length} item(s) with unplaced hooks, ${newItems.length} new component(s), ${notPorted.length} not ported (upstream/report.md)`
  )
} else {
  console.error(
    "usage: vp run upstream -- <scan | accept> [<item>…] [--ref <commit>] [--repo <path>]"
  )
  process.exit(2)
}
