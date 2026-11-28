/**
 * A project started as Get Code has a reader start it, with Kirana's own installer: for each
 * combination, Get Code's one command, `kirana-style ui init --template @kirana/<skeleton>` from
 * the registry package, which fetches the skeleton this checkout composed and packed
 * (`vp run templates`), installs it, and installs the design system in the app at that style's
 * preset (in a workspace, into `packages/ui`); then the slice added with `kirana-style ui add`
 * from the registry this checkout built, and the project formatted, linted, type-checked and
 * built with the skeleton's own scripts, its lockfile validated. The colour axes are checked to
 * hold the design's values only (the `kirana` item's per-value builds), and again after
 * `ui preset` to another design and back. Exits non-zero on the first failure.
 *
 *   bun scripts/install-smoke.ts [<framework>-<base>-<style>[@<skeleton>] …]   # what `vp run install` runs
 *   bun scripts/install-smoke.ts react-base-nova@next-turbopack--turbo--biome    # one skeleton
 *   bun scripts/install-smoke.ts --shard 2/4      # every fourth of the default list, from the second
 *   bun scripts/install-smoke.ts --audit --icons hugeicons --all react-kirana-nova
 *       # what the project holds alone (`scripts/install-audit.ts`): installed with that icon
 *       # library and every item its base has, read, every finding reported, nothing built
 *   bun scripts/install-smoke.ts --matrix --audit --filter '*--turbo--*' --summary out.json
 *       # Get Code's whole matrix (`scripts/install-matrix.ts`), or the entries the globs match,
 *       # every entry run to its end, each outcome written to the summary
 *
 * A combination may end in `/<icons>` and `/<runner>`: that icon library in the preset, and Get
 * Code's command line for that runner (`npx`, `pnpm dlx`, `yarn dlx`, `bunx --bun`, `vpx`), run as
 * written; without a runner, `bunx`.
 *
 * A skeleton is `<template>--<monorepo>--<tooling>` (`r/templates/index.json` lists them); without
 * one, the framework's Vite app alone with ESLint. Needs the site, its registry and the templates
 * built (`vp run templates`); serves `apps/site/dist/client` itself. The computed-style comparison
 * of installed against live stays a browser run, outside CI.
 */
import { spawn } from "node:child_process"
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { createServer } from "node:http"
import type { AddressInfo } from "node:net"
import { tmpdir } from "node:os"
import { join, relative } from "node:path"
import { gzipSync } from "node:zlib"

import { APPS } from "../packages/create/src/apps/index"
import {
  PROJECT,
  RUNNERS,
  TEMPLATES,
  WORKSPACE,
} from "../packages/create/src/catalog"
import type { Framework, Runner } from "../packages/create/src/catalog"
import { parseSkeletonId, skeletonId } from "../packages/create/src/choices"
import {
  REGISTRY_PACKAGE,
  commandLines,
  initArguments,
  projectSteps,
  templateReference,
} from "../packages/create/src/commands"
import { ICON_LIBRARIES } from "../registry/core/config"
import { encodePreset, readDesignSystem } from "../registry/core/preset"
import { ENFORCED, audit, choicesAsAsked, report } from "./install-audit"
import type { Finding } from "./install-audit"
import { filtered, matrix, shard, signatureOf } from "./install-matrix"
import type { Outcome } from "./install-matrix"

const ROOT = join(import.meta.dirname, "..")
const STATIC = join(ROOT, "apps", "site", "dist", "client")

/**
 * What CI installs: every framework on each of its bases (ui-sdk, then Kirana UI, after the
 * framework's own), across the templates, the toolings and the workspaces (a Turborepo, a Vite+
 * monorepo, each with `packages/ui`), each in another style; Solid on ui-sdk and on Kirana UI on
 * the one template on Solid 2, which those bases need.
 */
const DEFAULT = [
  "react-base-nova@vite-react--none--eslint",
  "react-aria-lyra@react-router--turbo--oxlint",
  "vue-ark-vega@nuxt--none--biome",
  "vue-reka-rhea@vite-vue--none--oxlint",
  "svelte-ark-maia@sveltekit--vite-plus--vite-plus",
  "svelte-bits-lyra@vite-svelte--none--oxlint",
  "react-uisdk-nova@vite-react--none--eslint",
  "vue-uisdk-maia@vite-vue--none--oxlint",
  "svelte-uisdk-vega@vite-svelte--none--oxlint",
  "solid-ark-mira@tanstack-start-solid--none--oxlint",
  "solid-uisdk-luma@vite-solid2--none--oxlint",
  "angular-ng-luma@analog-angular--none--eslint",
  "react-kirana-sera@vite-react--none--oxlint",
  "vue-kirana-luma@vite-vue--none--oxlint",
  "svelte-kirana-mira@vite-svelte--none--oxlint",
  "solid-kirana-rhea@vite-solid2--none--oxlint",
  "angular-kirana-nova@angular-cli--none--eslint",
]

/**
 * The slice, per framework: React's a cross-section, every other framework's every component,
 * block and the typeset in Vue's list that the registry's index gives it on its base.
 */
const SLICES = {
  react: [
    "button",
    "dialog",
    "select",
    "dropdown-menu",
    "card",
    "field",
    "input",
    "label",
    "separator",
    "tabs",
    "chart",
    "login-01",
    "sidebar-07",
    "typeset",
  ],
  vue: [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "attachment",
    "avatar",
    "badge",
    "breadcrumb",
    "bubble",
    "button",
    "button-group",
    "calendar",
    "card",
    "carousel",
    "chart",
    "checkbox",
    "code-block",
    "collapsible",
    "combobox",
    "command",
    "context-menu",
    "dialog",
    "direction",
    "drawer",
    "dropdown-menu",
    "empty",
    "field",
    "hover-card",
    "input",
    "input-group",
    "input-otp",
    "item",
    "kbd",
    "label",
    "login-01",
    "marker",
    "message",
    "native-select",
    "navigation-menu",
    "pagination",
    "popover",
    "progress",
    "radio-group",
    "resizable",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "sidebar",
    "sidebar-07",
    "skeleton",
    "slider",
    "sonner",
    "spinner",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toast",
    "toggle",
    "toggle-group",
    "tooltip",
    "trace",
    "typeset",
  ],
} as const

const INDEX = JSON.parse(
  readFileSync(join(STATIC, "r", "index.json"), "utf8")
) as {
  items: {
    name: string
    type?: string
    frameworks?: Record<string, string[]>
  }[]
}

function itemsOf(framework: string, base: string): string[] {
  if (framework === "react") return [...SLICES.react]
  const has = new Set(
    INDEX.items
      .filter((item) => item.frameworks?.[framework]?.includes(base))
      .map((item) => item.name)
  )
  // `typeset` is plain CSS, the same for every framework.
  return SLICES.vue.filter((name) => name === "typeset" || has.has(name))
}

/** Every item the registry's index gives `framework` on `base`. */
function everyItemOf(framework: string, base: string): string[] {
  return INDEX.items
    .filter(
      (item) =>
        item.frameworks?.[framework]?.includes(base) &&
        // A font is the design's, and the numbered blocks of a family write the same file
        // (`login-form.tsx`): the first of each stands for them.
        item.type !== "font" &&
        // The site's own placeholder with its icon data, which a component never needs installed.
        item.name !== "icon-placeholder" &&
        // `dashboard-01` writes `app-sidebar.tsx`, as `sidebar-01` does.
        item.name !== "dashboard-01" &&
        (!/^(login|signup|sidebar)-\d+$/.test(item.name) ||
          item.name.endsWith("-01"))
    )
    .map((item) => item.name)
}

const catalog = (
  JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
    workspaces: { catalog: Record<string, string> }
  }
).workspaces.catalog
const kirana = catalog["@kirana-style/core"]!

if (!existsSync(join(STATIC, "r", "templates", "index.json"))) {
  console.error(
    "install: no r/templates/index.json: run `vp run templates` first"
  )
  process.exit(2)
}

const TYPES: Record<string, string> = {
  ".json": "application/json",
  ".tgz": "application/gzip",
}
const server = createServer((request, response) => {
  const file = join(STATIC, new URL(request.url ?? "/", "http://x").pathname)
  if (existsSync(file) && statSync(file).isFile()) {
    // One connection per request: a kept-alive socket idles through the minute an install
    // takes, and the next fetch on it fails with "other side closed".
    response.writeHead(200, {
      "content-type":
        TYPES[file.slice(file.lastIndexOf("."))] ?? "application/octet-stream",
      connection: "close",
    })
    response.end(readFileSync(file))
  } else {
    response.writeHead(404).end("not found")
  }
})
await new Promise<void>((resolve) => server.listen(0, resolve))
const { port } = server.address() as AddressInfo
const registry = `http://localhost:${port}/r`

/** What a project's tree holds besides its own files. */
const GENERATED = new Set([
  "node_modules",
  "dist",
  "build",
  "vendor",
  ".next",
  ".output",
  ".nuxt",
  ".svelte-kit",
  ".astro",
  ".react-router",
  ".angular",
  ".kirana",
  ".vinxi",
  ".tanstack",
  ".nitro",
  ".turbo",
  "out-tsc",
])

/** Every file under `root`, relative, outside the generated folders: the project's own files. */
function filesOf(root: string): string[] {
  return readdirSync(root, { recursive: true, encoding: "utf8" }).filter(
    (file) => {
      if (file.split("/").some((part) => GENERATED.has(part))) return false
      return statSync(join(root, file)).isFile()
    }
  )
}

/** The colour axes' modules a project installs, one value each with its colours written in. */
const COLOUR_FILES = ["base-colors.ts", "themes.ts", "chart-colors.ts"]

/**
 * Every colour value the installed modules hold: the entries' attributes (`theme=cyan`) and the
 * palettes' values (`palette=cyan`).
 */
function colourValues(root: string): string[] {
  const files = filesOf(root).filter((file) =>
    COLOUR_FILES.some((name) => file.endsWith(`/${name}`))
  )
  if (files.length !== COLOUR_FILES.length)
    fail(`${COLOUR_FILES.join(", ")} not all installed in ${root}`)
  const found = new Set<string>()
  for (const file of files) {
    const text = readFileSync(join(root, file), "utf8")
    for (const match of text.matchAll(
      /data-(base-color|theme|chart-color)="([^"]+)"/g
    ))
      found.add(`${match[1]}=${match[2]}`)
    for (const match of text.matchAll(/^ {2}"?([a-z]+)"?: \{$/gm))
      found.add(`palette=${match[1]}`)
  }
  return [...found].sort()
}

function expectColours(root: string, expected: string[], when: string) {
  const found = colourValues(root)
  if (found.join() !== [...expected].sort().join())
    fail(
      `${when}, the colour axes hold ${found.join(", ") || "no value"}, not ${expected.join(", ") || "no value"}`
    )
  console.log(
    `install: ${when}, colours ${found.join(", ") || "the default's"}`
  )
}

/** The built stylesheets' size, gzip, for the log. */
function stylesheetSize(app: string, output: string) {
  const folder = join(app, output)
  if (!existsSync(folder)) fail(`no build output at ${folder}`)
  const css = readdirSync(folder, {
    recursive: true,
    encoding: "utf8",
  }).filter((file) => file.endsWith(".css"))
  const bytes = css.reduce(
    (sum, file) => sum + gzipSync(readFileSync(join(folder, file))).length,
    0
  )
  return `${(bytes / 1024).toFixed(1)} KB gzip`
}

/** A step that failed: the entry stops, and the run with it unless it keeps going. */
class Failure extends Error {}
function fail(message: string): never {
  throw new Failure(message)
}

/**
 * Asynchronous, so the server above keeps answering while the command runs; the output is
 * shown and given back.
 */
async function run(cwd: string, command: string, ...args: string[]) {
  console.log(`$ ${[command, ...args].join(" ")}`)
  let output = ""
  const status = await new Promise<number | null>((resolve) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ["inherit", "pipe", "inherit"],
    })
    child.stdout.on("data", (chunk: Buffer) => {
      output += chunk.toString()
      process.stdout.write(chunk)
    })
    child.on("close", resolve)
  })
  if (status !== 0) fail(`${command} ${args[0] ?? ""} failed in ${cwd}`)
  return output
}

/** `--name <value>` taken out of `argv`. */
function option(argv: string[], name: string): string | undefined {
  const at = argv.indexOf(name)
  if (at === -1) return undefined
  return argv.splice(at, 2)[1]
}
/** `--name` taken out of `argv`. */
function flag(argv: string[], name: string): boolean {
  const at = argv.indexOf(name)
  if (at !== -1) argv.splice(at, 1)
  return at !== -1
}
const ARGV = process.argv.slice(2)
/** Read what is installed and report, building nothing. */
const AUDIT_ONLY = flag(ARGV, "--audit")
/** Every item the base has, not the slice. */
const ALL_ITEMS = flag(ARGV, "--all")
/** The design's icon library, where the style's own is not asked for. */
const ICONS = option(ARGV, "--icons")
/** These items alone (comma-separated), in place of the slice. */
const ITEMS = option(ARGV, "--items")?.split(",")
/** Get Code's whole matrix in place of the default list. */
const MATRIX = flag(ARGV, "--matrix")
/** Comma-separated globs an entry's name must match one of. */
const FILTER = option(ARGV, "--filter")
/** Every n-th entry from the i-th, so CI installs the list on n runners side by side. */
const SHARD = option(ARGV, "--shard")
/** Where each entry's outcome is written, as JSON; every entry then runs to its end. */
const SUMMARY = option(ARGV, "--summary")
// The flag is read first: reading it takes it off the list of combinations.
const KEEP_GOING = flag(ARGV, "--keep-going") || SUMMARY !== undefined
const audited: { name: string; findings: Finding[] }[] = []
const outcomes: Outcome[] = []

/**
 * The combinations asked for, else the matrix (`--matrix`) or the default list; `--filter` and
 * `--shard` then narrow it.
 */
function selected(argv: string[]): string[] {
  const list = argv.length
    ? argv
    : MATRIX
      ? matrix().map((entry) => entry.name)
      : DEFAULT
  const names = FILTER
    ? filtered(
        list.map((name) => ({ name })),
        FILTER
      ).map((entry) => entry.name)
    : list
  return shard(names, SHARD)
}

/** An entry asked for: the combination, the skeleton, and its icon library and runner if named. */
function parse(asked: string) {
  const [combination = "", rest] = asked.split("@")
  const [named, ...options] = (rest ?? "").split("/")
  const [framework, base, style] = combination.split("-") as [
    Framework,
    string,
    string,
  ]
  if (!(framework in TEMPLATES) || !base || !style) {
    console.error(`install: not a combination: ${asked}`)
    process.exit(2)
  }
  const skeleton = parseSkeletonId(
    named ||
      skeletonId({
        template: TEMPLATES[framework][0],
        monorepo: "none",
        tooling: "eslint",
      })
  )
  if (!skeleton || skeleton.framework !== framework) {
    console.error(`install: not a skeleton for ${framework}: ${named}`)
    process.exit(2)
  }
  const icons = options.find((value) =>
    (ICON_LIBRARIES as readonly string[]).includes(value)
  )
  const runner = options.find((value) =>
    (RUNNERS as readonly string[]).includes(value)
  ) as Runner | undefined
  const unknown = options.filter((value) => value !== icons && value !== runner)
  if (unknown.length) {
    console.error(
      `install: neither an icon library nor a runner: ${unknown.join(", ")}`
    )
    process.exit(2)
  }
  return {
    combination,
    framework,
    base,
    style,
    skeleton,
    icons: icons ?? ICONS,
    runner,
  }
}

async function install(asked: string): Promise<Outcome> {
  const { combination, framework, base, style, skeleton, icons, runner } =
    parse(asked)
  // The project's binaries and scripts through the runner that started it, as its reader runs
  // them (Yarn's Plug'n'Play has no node_modules for `bunx` to find them in); Bun's otherwise.
  const kiranaStyle = (cwd: string, ...args: string[]) =>
    runner && runner !== "bun"
      ? run(
          cwd,
          "sh",
          "-c",
          commandLines(
            [{ exec: ["kirana-style", ...args].join(" ") }],
            runner
          )[0]!
        )
      : run(cwd, "bunx", "kirana-style", ...args)
  const script = (cwd: string, name: string) =>
    runner && runner !== "bun"
      ? run(cwd, runner === "vp" ? "pnpm" : runner, "run", name)
      : run(cwd, "bun", "run", name)
  const id = skeletonId(skeleton)
  // The code the site's customizer gives this combination, with the rules between axes applied.
  const system = readDesignSystem(
    new URLSearchParams({
      framework,
      base,
      style,
      ...(icons ? { iconLibrary: icons } : {}),
    })
  ).system
  const preset = encodePreset(system)
  console.log(
    `\n== ${combination} ${id} (${preset}${runner ? `, ${runner}` : ""})`
  )

  const folder = mkdtempSync(join(tmpdir(), `kirana-ui-${combination}-`))
  const choices = { ...skeleton, base: system.base, pointer: true, rtl: false }
  // Get Code's command: the skeleton fetched from this checkout's templates, installed, the design
  // system installed with the preset, `data-pointer` on `<html>`. With a runner, the line Get Code
  // writes for it, the registry package at this checkout's Kirana; else under Bun.
  if (runner) {
    const [line = ""] = commandLines(
      projectSteps(choices, system, registry),
      runner
    )
    await run(
      folder,
      "sh",
      "-c",
      line.replace(`${REGISTRY_PACKAGE} `, `${REGISTRY_PACKAGE}@${kirana} `)
    )
  } else
    await run(
      folder,
      "bunx",
      `${REGISTRY_PACKAGE}@${kirana}`,
      "init",
      "--template",
      templateReference(skeleton),
      PROJECT.directory,
      ...initArguments(choices, system, registry).split(" ")
    )
  const root = join(folder, PROJECT.directory)
  const workspace = skeleton.monorepo !== "none"
  const app = workspace ? join(root, "apps", PROJECT.app) : root
  // Where the components and the lockfile are: the package of a workspace.
  const project = workspace ? join(root, WORKSPACE.uiPath) : root
  const example = APPS[skeleton.template]
  if (
    !/<html[^>]*\bdata-pointer\b/i.test(
      readFileSync(join(app, example.document), "utf8")
    )
  )
    fail(
      `init --pointer did not set data-pointer on <html> in ${example.document}`
    )
  // The preset's font is Inter: `init` installs its item, which imports the family's stylesheet
  // in the app (on the Angular CLI, lists it in angular.json's `styles`), and its package in the
  // app's manifest, also in a workspace.
  if (
    !filesOf(app).some((file) =>
      /"@fontsource-variable\/inter(?:\/[^"]*\.css)?"/.test(
        readFileSync(join(app, file), "utf8")
      )
    )
  )
    fail(`init did not import the preset's font in ${app}`)
  const manifest = JSON.parse(
    readFileSync(join(app, "package.json"), "utf8")
  ) as Record<string, Record<string, string> | undefined>
  if (
    !manifest.dependencies?.["@fontsource-variable/inter"] &&
    !manifest.devDependencies?.["@fontsource-variable/inter"]
  )
    fail(
      `init did not add the preset's font's package to ${join(app, "package.json")}`
    )
  const items = ITEMS
    ? ITEMS
    : ALL_ITEMS
      ? everyItemOf(framework, base)
      : itemsOf(framework, base)
  console.log(`install: ${items.length} items for ${framework} on ${base}`)
  await kiranaStyle(app, "ui", "add", ...items)
  // What the project now holds, read as its owner reads it: nothing it did not choose, and each
  // choice as it was asked.
  const asks = {
    framework,
    base,
    iconLibrary: system.iconLibrary,
    tooling: skeleton.tooling,
    monorepo: skeleton.monorepo,
  }
  const findings = [
    ...audit(root, asks),
    ...choicesAsAsked(root, {
      ...asks,
      template: skeleton.template,
      design: system,
      preset,
      runner: runner ?? "bun",
    }),
  ]
  const outcome: Outcome = {
    name: asked,
    status: findings.length ? "findings" : "ok",
    rules: Object.fromEntries(
      [...new Set(findings.map((finding) => finding.rule))].map((rule) => [
        rule,
        findings.filter((finding) => finding.rule === rule).length,
      ])
    ),
    details: findings
      .filter((finding) =>
        ["choices", "tooling", "leftover"].includes(finding.rule)
      )
      .map((finding) => `${finding.rule} ${finding.file}: ${finding.detail}`),
    signature: signatureOf(root),
  }
  if (findings.length > 0) {
    console.error(
      `install: ${asked} holds what it did not choose\n${report(findings)}`
    )
    if (
      !AUDIT_ONLY &&
      findings.some((finding) => ENFORCED.includes(finding.rule))
    )
      fail(`${asked} breaks an enforced rule`)
  }
  if (AUDIT_ONLY) {
    audited.push({ name: `${asked} ${system.iconLibrary}`, findings })
    if (!process.env.KEEP) rmSync(folder, { recursive: true, force: true })
    else console.log(`install: kept ${root}`)
    return outcome
  }
  // The style's preset has the default colours, whose values are the tokens' own: no entries,
  // and Neutral alone in each palette.
  expectColours(project, [], "installed")
  await script(root, "build")
  console.log(`install: stylesheets ${stylesheetSize(app, example.output)}`)
  // Another design's colours replace the modules, and coming back leaves none of them. Before the
  // formatter runs: `ui preset` stops at a file the reader changed, and a formatter's pass counts.
  const colours = encodePreset(
    readDesignSystem(
      new URLSearchParams({
        framework,
        base,
        style,
        ...(icons ? { iconLibrary: icons } : {}),
        baseColor: "stone",
        theme: "cyan",
        chartColor: "green",
      })
    ).system
  )
  await kiranaStyle(app, "ui", "preset", colours)
  expectColours(
    project,
    [
      "base-color=stone",
      "theme=cyan",
      "chart-color=green",
      "palette=stone",
      "palette=cyan",
      "palette=green",
    ],
    `after ui preset ${colours}`
  )
  await script(root, "build")
  await kiranaStyle(app, "ui", "preset", preset)
  expectColours(project, [], `back at ${preset}`)
  // The skeleton's own scripts, from the root: the installed files formatted (so `lint` and
  // `typecheck` read them as the reader would commit them), linted, type-checked and built again.
  const scripts = (
    JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>
    }
  ).scripts
  for (const name of ["format", "lint", "typecheck"])
    if (scripts[name]) await script(root, name)
  if (scripts.check) await script(root, "check")
  await script(root, "build")
  // `kirana-style ui` runs in the app, which has the registry package; the lockfile is the
  // project's.
  await kiranaStyle(
    app,
    "ui",
    "validate",
    join(relative(app, project), "kirana-style.lock.json")
  )
  rmSync(folder, { recursive: true, force: true })
  return outcome
}

const list = selected(ARGV)
console.log(`install: ${list.length} entr${list.length === 1 ? "y" : "ies"}`)
for (const asked of list) {
  try {
    outcomes.push(await install(asked))
  } catch (error) {
    if (!(error instanceof Failure)) throw error
    console.error(`install: ${asked}: ${error.message}`)
    outcomes.push({
      name: asked,
      status: "failed",
      error: error.message,
      rules: {},
    })
    if (!KEEP_GOING) {
      server.close()
      process.exit(1)
    }
  }
  if (SUMMARY) writeFileSync(SUMMARY, `${JSON.stringify(outcomes, null, 2)}\n`)
}

server.close()
const failed = outcomes.filter((outcome) => outcome.status === "failed")
if (failed.length)
  console.log(
    `\ninstall: ${failed.length} of ${outcomes.length} failed\n${failed.map((outcome) => `  ${outcome.name}: ${outcome.error}`).join("\n")}`
  )
if (AUDIT_ONLY) {
  console.log("\ninstall: what each project holds that it did not choose")
  for (const { name, findings } of audited) {
    const rules = new Map<string, number>()
    for (const finding of findings)
      rules.set(finding.rule, (rules.get(finding.rule) ?? 0) + 1)
    console.log(
      `  ${name}: ${findings.length === 0 ? "nothing" : [...rules].map(([rule, count]) => `${rule} ${count}`).join(", ")}`
    )
  }
  // With a summary, the findings are its to report: the run fails on a failed install or an
  // enforced rule alone.
  const counted = (findings: Finding[]) =>
    SUMMARY === undefined
      ? findings.length > 0
      : findings.some((finding) => ENFORCED.includes(finding.rule))
  process.exit(
    failed.length || audited.some(({ findings }) => counted(findings)) ? 1 : 0
  )
}
if (failed.length) process.exit(1)
console.log("\ninstall: every combination installed, built and validated")
