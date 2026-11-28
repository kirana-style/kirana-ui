/**
 * The whole of what Get Code offers, as install-test entries: every skeleton the site packs
 * (`r/templates/index.json`, which must be `everySkeleton()`'s list), each with one of the bases
 * its template runs, one of the styles and one of the icon libraries, turned in order so every
 * value of each meets every framework; then every icon library on one skeleton per framework, and
 * every runner Get Code writes the command for on a single app and on a Turborepo (the two places
 * the running package manager decides what is written).
 *
 *   bun scripts/install-matrix.ts                  # the numbers, and the entries one per line
 *   bun scripts/install-matrix.ts --list           # the entries alone, for `install-smoke.ts`
 *   bun scripts/install-matrix.ts --summary <json>…  # the summaries `install-smoke.ts --summary` wrote, per option value
 *
 * An entry is `<framework>-<base>-<style>@<skeleton>[/<icons>][/<runner>]`, as
 * `scripts/install-smoke.ts` takes it.
 */
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import {
  FRAMEWORKS,
  FRAMEWORK_BASES,
  RUNNERS,
  TEMPLATES,
} from "../packages/create/src/catalog"
import type { Framework, Runner } from "../packages/create/src/catalog"
import {
  basesFor,
  everySkeleton,
  skeletonId,
} from "../packages/create/src/choices"
import { ICON_LIBRARIES, STYLES } from "../registry/core/config"
import type { IconLibrary } from "../registry/core/config"

const ROOT = join(import.meta.dirname, "..")
const INDEX = join(ROOT, "apps", "site", "dist", "client", "r", "templates")

export type Entry = {
  /** As `install-smoke.ts` takes it. */
  name: string
  framework: Framework
  base: string
  style: string
  skeleton: string
  template: string
  monorepo: string
  tooling: string
  icons: IconLibrary
  runner: Runner
  /** Which part of the matrix it is: `skeleton`, `icons` or `runner`. */
  part: "skeleton" | "icons" | "runner"
}

/** The runners the install test runs: Deno is offered too, and not installed where it runs. */
export const RUNNABLE: readonly Runner[] = ["bun", "npm", "pnpm", "yarn", "vp"]

export function entryName(
  entry: Pick<
    Entry,
    "framework" | "base" | "style" | "skeleton" | "icons" | "runner"
  >
) {
  return `${entry.framework}-${entry.base}-${entry.style}@${entry.skeleton}/${entry.icons}/${entry.runner}`
}

/** The skeletons the site packs, in its index's order; checked against the catalog. */
export function packedSkeletons(): string[] {
  const file = join(INDEX, "index.json")
  const catalog = everySkeleton().map(skeletonId)
  if (!existsSync(file)) return catalog
  const packed = (
    JSON.parse(readFileSync(file, "utf8")) as { templates: { name: string }[] }
  ).templates.map((template) => template.name)
  const missing = catalog.filter((id) => !packed.includes(id))
  const extra = packed.filter((id) => !catalog.includes(id))
  if (missing.length || extra.length)
    throw new Error(
      `install-matrix: the packed templates are not the catalog's: missing ${missing.join(", ") || "none"}, extra ${extra.join(", ") || "none"}; run bun scripts/templates.ts`
    )
  return packed
}

export function matrix(): Entry[] {
  const skeletons = everySkeleton()
  const byId = new Map(
    skeletons.map((skeleton) => [skeletonId(skeleton), skeleton])
  )
  const entries: Entry[] = []
  const turn = new Map<string, number>()
  /** The next of `list` for `key`, so each value comes round in turn. */
  const next = <T>(key: string, list: readonly T[]): T => {
    const at = turn.get(key) ?? 0
    turn.set(key, at + 1)
    return list[at % list.length]!
  }
  for (const id of packedSkeletons()) {
    const skeleton = byId.get(id)!
    const bases = basesFor(skeleton.framework, skeleton.template)
    const entry = {
      framework: skeleton.framework,
      base: next(`base:${skeleton.template}`, bases),
      style: next(`style:${skeleton.framework}`, STYLES),
      skeleton: id,
      template: skeleton.template,
      monorepo: skeleton.monorepo,
      tooling: skeleton.tooling,
      icons: next(`icons:${skeleton.framework}`, ICON_LIBRARIES),
      // Get Code locks a Vite+ project to `vp`.
      runner: (skeleton.tooling === "vite-plus" ? "vp" : "bun") as Runner,
      part: "skeleton" as const,
    }
    entries.push({ ...entry, name: entryName(entry) })
  }
  for (const framework of FRAMEWORKS) {
    const template = TEMPLATES[framework][0]
    const skeleton = skeletonId({
      template,
      monorepo: "none",
      tooling: "oxlint",
    })
    for (const icons of ICON_LIBRARIES) {
      const entry = {
        framework,
        base: FRAMEWORK_BASES[framework][0]!,
        style: "nova",
        skeleton,
        template,
        monorepo: "none",
        tooling: "oxlint",
        icons,
        runner: "bun" as Runner,
        part: "icons" as const,
      }
      entries.push({ ...entry, name: entryName(entry) })
    }
  }
  for (const monorepo of ["none", "turbo"] as const)
    for (const runner of RUNNABLE.filter(
      (name) => name !== "bun" && name !== "vp"
    )) {
      const skeleton = skeletonId({
        template: "vite-react",
        monorepo,
        tooling: "eslint",
      })
      const entry = {
        framework: "react" as Framework,
        base: "base",
        style: "nova",
        skeleton,
        template: "vite-react",
        monorepo,
        tooling: "eslint",
        icons: "lucide" as IconLibrary,
        runner,
        part: "runner" as const,
      }
      entries.push({ ...entry, name: entryName(entry) })
    }
  // An entry already in the matrix is run once.
  return entries.filter(
    (entry, at) =>
      entries.findIndex((other) => other.name === entry.name) === at
  )
}

/** `entries` whose name matches every comma-separated glob of `filter` (`*` any run of characters). */
export function filtered<T extends { name: string }>(
  entries: T[],
  filter?: string
): T[] {
  if (!filter) return entries
  const patterns = filter.split(",").map(
    (glob) =>
      new RegExp(
        `^${glob
          .trim()
          .replace(/[.+^${}()|[\]\\]/g, "\\$&")
          .replaceAll("*", ".*")
          .replaceAll("?", ".")}$`
      )
  )
  return entries.filter((entry) =>
    patterns.some((pattern) => pattern.test(entry.name))
  )
}

/** The i-th of n shares of `list`, every n-th from the i-th. */
export function shard<T>(list: T[], spec: string | undefined): T[] {
  if (!spec) return list
  const [index = 0, count = 0] = spec.split("/").map(Number)
  if (!(count >= 1 && index >= 1 && index <= count))
    throw new Error(`--shard takes <i>/<n>, 1 <= i <= n: ${spec}`)
  return list.filter((_, position) => position % count === index - 1)
}

/** What `install-smoke.ts --summary` writes, one per entry run. */
export type Outcome = {
  name: string
  /** `ok`, `findings` (audit only), or `failed` (the install or a build stopped). */
  status: "ok" | "findings" | "failed"
  error?: string
  /** Findings per rule. */
  rules: Record<string, number>
  /** Each finding of the rules this report is about, `rule file: detail`. */
  details?: string[]
  /** What the project's choices came out as (`choicesSignature`), to tell choices apart. */
  signature?: Record<string, string>
}

/** The option values an entry asked for, by option. */
function optionsOf(name: string): Record<string, string> {
  const [combination = "", rest = ""] = name.split("@")
  const [framework, base, style] = combination.split("-")
  const [skeleton = "", icons = "", runner = ""] = rest.split("/")
  const [template, monorepo, tooling] = skeleton.split("--")
  return {
    framework: framework!,
    base: `${framework}/${base}`,
    style: style!,
    template: template!,
    monorepo: monorepo!,
    tooling: tooling!,
    icons,
    runner,
  }
}

/**
 * The outcomes per option value: entries run, failed, with choice findings, and whether another
 * value of the same option came out the same (`same as`), which is a choice that does not change
 * the project.
 */
export function summarize(outcomes: Outcome[], rules: readonly string[]) {
  const rows = new Map<
    string,
    { runs: number; failed: number; findings: number; withFindings: number }
  >()
  for (const outcome of outcomes) {
    const counted = rules.reduce(
      (sum, rule) => sum + (outcome.rules[rule] ?? 0),
      0
    )
    for (const [option, value] of Object.entries(optionsOf(outcome.name))) {
      const key = `${option}\t${value}`
      const row = rows.get(key) ?? {
        runs: 0,
        failed: 0,
        findings: 0,
        withFindings: 0,
      }
      row.runs++
      if (outcome.status === "failed") row.failed++
      row.findings += counted
      if (counted > 0) row.withFindings++
      rows.set(key, row)
    }
  }
  // Two values of one option whose projects agree on what that option decides.
  const same: string[] = []
  const signatures = new Map<string, Map<string, string>>()
  for (const outcome of outcomes) {
    if (!outcome.signature) continue
    const options = optionsOf(outcome.name)
    for (const [option, signature] of Object.entries(outcome.signature)) {
      const value = options[option]
      if (!value) continue
      // Compared where nothing else decides it: an icon library within a framework (each draws
      // its own), a runner within a workspace kind; `vp` runs pnpm, so the two agree by design.
      const context =
        option === "icons"
          ? `icons on ${options.framework}`
          : option === "runner"
            ? `runner in ${options.monorepo}`
            : option
      if (option === "runner" && value === "vp") continue
      const seen = signatures.get(context) ?? new Map<string, string>()
      // Keep one signature per value; a value giving two is reported below as unstable only if
      // they disagree on that option alone, which the per-project rule already reports.
      if (!seen.has(value)) seen.set(value, signature)
      signatures.set(context, seen)
    }
  }
  for (const [option, values] of signatures) {
    const byShape = new Map<string, string[]>()
    for (const [value, signature] of values)
      byShape.set(signature, [...(byShape.get(signature) ?? []), value])
    for (const [signature, list] of byShape)
      if (list.length > 1)
        same.push(`${option}: ${list.join(", ")} all give ${signature}`)
  }
  return { rows, same }
}

/** What the project's choices came out as, per option, to tell two choices' projects apart. */
export function signatureOf(root: string): Record<string, string> {
  const at = (path: string) => existsSync(join(root, path))
  const manifests = [
    "package.json",
    "apps/web/package.json",
    "packages/ui/package.json",
  ]
    .filter(at)
    .map(
      (file) =>
        JSON.parse(readFileSync(join(root, file), "utf8")) as Record<
          string,
          Record<string, string> | undefined
        >
    )
  const packages = new Set(
    manifests.flatMap((manifest) =>
      Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })
    )
  )
  const scripts =
    (
      JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
        scripts?: Record<string, string>
      }
    ).scripts ?? {}
  const pick = (pattern: RegExp) =>
    [...packages]
      .filter((name) => pattern.test(name))
      .sort()
      .join(" ") || "none"
  return {
    tooling: `${["eslint.config.js", ".oxlintrc.json", "biome.json"].filter(at).join(" ") || "no config"}; lint: ${scripts.lint ?? "none"}`,
    monorepo:
      ["turbo.json", "apps/web", "packages/ui"].filter(at).join(" ") ||
      "single app",
    icons: pick(
      /^(lucide|@lucide\/|@hugeicons\/|@tabler\/|@phosphor-icons\/|phosphor-|@remixicon\/|remixicon)/
    ),
    base: pick(
      /^(@base-ui\/|react-aria-components|@ark-ui\/|ng-primitives|reka-ui|bits-ui|@ui-sdk\/|@kirana-ui\/)/
    ),
    runner:
      ["bun.lock", "package-lock.json", "pnpm-lock.yaml", "yarn.lock"]
        .filter(at)
        .join(" ") || "no lockfile",
    // The framework (Solid 2 by `@solidjs/web`) and the meta-framework in the app's manifest.
    template: pick(
      /^(react|vue|svelte|solid-js|@solidjs\/web|@angular\/core|next|@tanstack\/(react|solid)-start|react-router|astro|laravel-vite-plugin|nuxt|@sveltejs\/kit|@solidjs\/start|@analogjs\/platform|@angular\/build)$/
    ),
  }
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  if (argv[0] === "--summary") {
    const outcomes = argv
      .slice(1)
      .flatMap((file) => JSON.parse(readFileSync(file, "utf8")) as Outcome[])
    const { rows, same } = summarize(outcomes, [
      "choices",
      "tooling",
      "leftover",
    ])
    console.log(
      "| Option | Value | Runs | Failed | Choice findings | Entries with findings |"
    )
    console.log("| --- | --- | ---: | ---: | ---: | ---: |")
    for (const [key, row] of [...rows].sort(([a], [b]) => a.localeCompare(b))) {
      const [option, value] = key.split("\t")
      console.log(
        `| ${option} | ${value} | ${row.runs} | ${row.failed} | ${row.findings} | ${row.withFindings} |`
      )
    }
    console.log(
      same.length
        ? `\nChoices that do not change the project:\n${same.map((line) => `- ${line}`).join("\n")}`
        : "\nEvery value of every option gives its own project."
    )
    const failed = outcomes.filter((outcome) => outcome.status === "failed")
    if (failed.length)
      console.log(
        `\nFailed:\n${failed.map((outcome) => `- ${outcome.name}: ${outcome.error ?? ""}`).join("\n")}`
      )
    process.exit(0)
  }
  const entries = matrix()
  if (argv.includes("--list")) {
    for (const entry of entries) console.log(entry.name)
    process.exit(0)
  }
  const skeletons = packedSkeletons()
  const pairs = everySkeleton().reduce(
    (sum, skeleton) =>
      sum + basesFor(skeleton.framework, skeleton.template).length,
    0
  )
  const parts = { skeleton: 0, icons: 0, runner: 0 }
  for (const entry of entries) parts[entry.part]++
  console.log(`skeletons packed: ${skeletons.length}`)
  console.log(`skeleton and base pairs Get Code allows: ${pairs}`)
  console.log(
    `with every style (${STYLES.length}) and icon library (${ICON_LIBRARIES.length}): ${pairs * STYLES.length * ICON_LIBRARIES.length}, times ${RUNNERS.length} runners`
  )
  console.log(
    `entries: ${entries.length} (${parts.skeleton} skeletons, ${parts.icons} icon runs, ${parts.runner} runner runs)`
  )
  for (const entry of entries) console.log(`  ${entry.name}`)
}
