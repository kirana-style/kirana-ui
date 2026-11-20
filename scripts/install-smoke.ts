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
} from "node:fs"
import { createServer } from "node:http"
import type { AddressInfo } from "node:net"
import { tmpdir } from "node:os"
import { join, relative } from "node:path"
import { gzipSync } from "node:zlib"

import { APPS } from "../packages/create/src/apps/index"
import { PROJECT, TEMPLATES, WORKSPACE } from "../packages/create/src/catalog"
import type { Framework } from "../packages/create/src/catalog"
import { parseSkeletonId, skeletonId } from "../packages/create/src/choices"
import {
  REGISTRY_PACKAGE,
  initArguments,
  templateReference,
} from "../packages/create/src/commands"
import { encodePreset, readDesignSystem } from "../registry/core/preset"

const ROOT = join(import.meta.dirname, "..")
const STATIC = join(ROOT, "apps", "site", "dist", "client")

/**
 * What CI installs: every framework on each of its bases (ui-sdk, then Kirana UI, after the
 * framework's own), across the templates, the toolings and the workspaces (a Turborepo, a Vite+
 * monorepo, each with `packages/ui`), each in another style; Solid on ui-sdk on the one template
 * on Solid 2, which its base needs.
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
  "solid-kirana-rhea@solid-start--none--oxlint",
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
) as { items: { name: string; frameworks?: Record<string, string[]> }[] }

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

/** The colour axes' modules a project installs, one value each (KF-080). */
const COLOUR_FILES = [
  "base-colors.ts",
  "themes.ts",
  "chart-colors.ts",
  "base-color-palette.ts",
  "theme-palette.ts",
  "chart-color-palette.ts",
]

/**
 * Every colour value the installed modules hold: the entries' attributes (`theme=cyan`) and the
 * palettes' values (`palette=cyan`).
 */
function colourValues(root: string): string[] {
  const files = filesOf(root).filter((file) =>
    COLOUR_FILES.some((name) => file.endsWith(`/${name}`))
  )
  if (files.length !== COLOUR_FILES.length) {
    console.error(
      `install: ${COLOUR_FILES.join(", ")} not all installed in ${root}`
    )
    process.exit(1)
  }
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
  if (found.join() !== [...expected].sort().join()) {
    console.error(
      `install: ${when}, the colour axes hold ${found.join(", ") || "no value"}, not ${expected.join(", ") || "no value"}`
    )
    process.exit(1)
  }
  console.log(
    `install: ${when}, colours ${found.join(", ") || "the default's"}`
  )
}

/** The built stylesheets' size, gzip, for the log. */
function stylesheetSize(app: string, output: string) {
  const folder = join(app, output)
  if (!existsSync(folder)) {
    console.error(`install: no build output at ${folder}`)
    process.exit(1)
  }
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
  if (status !== 0) {
    console.error(`install: ${command} ${args[0] ?? ""} failed in ${cwd}`)
    process.exit(1)
  }
  return output
}

/**
 * The combinations asked for, else the default list; `--shard <i>/<n>` keeps every n-th of the
 * default list from the i-th, so CI installs it on n runners side by side.
 */
function selected(argv: string[]) {
  const at = argv.indexOf("--shard")
  if (at === -1) return argv.length ? argv : DEFAULT
  const [index = 0, count = 0] = (argv[at + 1] ?? "").split("/").map(Number)
  if (!(count >= 1 && index >= 1 && index <= count))
    throw new Error(`--shard takes <i>/<n>, 1 <= i <= n: ${argv[at + 1]}`)
  return DEFAULT.filter((_, position) => position % count === index - 1)
}

for (const asked of selected(process.argv.slice(2))) {
  const [combination = "", named] = asked.split("@")
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
    named ??
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
  const id = skeletonId(skeleton)
  // The code the site's customizer gives this combination, with the rules between axes applied.
  const system = readDesignSystem(
    new URLSearchParams({ framework, base, style })
  ).system
  const preset = encodePreset(system)
  console.log(`\n== ${combination} ${id} (${preset})`)

  const folder = mkdtempSync(join(tmpdir(), `kirana-ui-${combination}-`))
  const choices = { ...skeleton, base: system.base, pointer: true, rtl: false }
  // Get Code's command, under Bun: the skeleton fetched from this checkout's templates, installed,
  // the design system installed with the preset, `data-pointer` on `<html>`.
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
  ) {
    console.error(
      `install: init --pointer did not set data-pointer on <html> in ${example.document}`
    )
    process.exit(1)
  }
  // The preset's font is Inter: `init` installs its item, which imports the family's stylesheet
  // in the app (on the Angular CLI, lists it in angular.json's `styles`), and its package in the
  // app's manifest, also in a workspace.
  if (
    !filesOf(app).some((file) =>
      /"@fontsource-variable\/inter(?:\/[^"]*\.css)?"/.test(
        readFileSync(join(app, file), "utf8")
      )
    )
  ) {
    console.error(`install: init did not import the preset's font in ${app}`)
    process.exit(1)
  }
  const manifest = JSON.parse(
    readFileSync(join(app, "package.json"), "utf8")
  ) as Record<string, Record<string, string> | undefined>
  if (
    !manifest.dependencies?.["@fontsource-variable/inter"] &&
    !manifest.devDependencies?.["@fontsource-variable/inter"]
  ) {
    console.error(
      `install: init did not add the preset's font's package to ${join(app, "package.json")}`
    )
    process.exit(1)
  }
  const items = itemsOf(framework, base)
  console.log(`install: ${items.length} items for ${framework} on ${base}`)
  await run(app, "bunx", "kirana-style", "ui", "add", ...items)
  // The style's preset has the default colours, whose values are the tokens' own: no entries,
  // and Neutral alone in each palette.
  expectColours(project, ["palette=neutral"], "installed")
  await run(root, "bun", "run", "build")
  console.log(`install: stylesheets ${stylesheetSize(app, example.output)}`)
  // Another design's colours replace the modules, and coming back leaves none of them. Before the
  // formatter runs: `ui preset` stops at a file the reader changed, and a formatter's pass counts.
  const colours = encodePreset(
    readDesignSystem(
      new URLSearchParams({
        framework,
        base,
        style,
        baseColor: "stone",
        theme: "cyan",
        chartColor: "green",
      })
    ).system
  )
  await run(app, "bunx", "kirana-style", "ui", "preset", colours)
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
  await run(root, "bun", "run", "build")
  await run(app, "bunx", "kirana-style", "ui", "preset", preset)
  expectColours(project, ["palette=neutral"], `back at ${preset}`)
  // The skeleton's own scripts, from the root: the installed files formatted (so `lint` and
  // `typecheck` read them as the reader would commit them), linted, type-checked and built again.
  const scripts = (
    JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>
    }
  ).scripts
  for (const script of ["format", "lint", "typecheck"])
    if (scripts[script]) await run(root, "bun", "run", script)
  if (scripts.check) await run(root, "bun", "run", "check")
  await run(root, "bun", "run", "build")
  // `kirana-style ui` runs in the app, which has the registry package; the lockfile is the
  // project's.
  await run(
    app,
    "bunx",
    "kirana-style",
    "ui",
    "validate",
    join(relative(app, project), "kirana-style.lock.json")
  )
  rmSync(folder, { recursive: true, force: true })
}

server.close()
console.log("\ninstall: every combination installed, built and validated")
