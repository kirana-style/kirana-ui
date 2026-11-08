/**
 * A project started as Get Code has a reader start it, with Kirana's own installer: for each
 * combination, a skeleton composed from `packages/create` (the app, its tooling, its workspace)
 * written to an empty folder, its packages installed, set to that style's preset with
 * `kirana-style ui init` (which installs the design system and its font), the slice added with
 * `kirana-style ui add` from the registry this checkout built, then formatted, linted,
 * type-checked and built with the skeleton's own scripts, and its lockfile validated. The colour
 * axes are checked to hold the design's values only (the `kirana` item's per-value builds), and
 * again after `ui preset` to another design and back. Exits non-zero on the first failure.
 *
 *   bun scripts/install-smoke.ts [<framework>-<base>-<style>[@<skeleton>] …]   # what `vp run install` runs
 *   bun scripts/install-smoke.ts react-base-nova@next-turbopack--turbo--biome    # one skeleton
 *
 * A skeleton is `<template>--<monorepo>--<tooling>` (`templates/index.json` lists them); without
 * one, the framework's Vite app alone with ESLint. Needs the site and its registry built
 * (`vp run registry`); serves `apps/site/dist/client` itself. The computed-style comparison of
 * installed against live stays a browser run, outside CI.
 */
import { spawn } from "node:child_process"
import {
  existsSync,
  mkdirSync,
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
import { dirname, join } from "node:path"
import { gzipSync } from "node:zlib"

import { APPS } from "../packages/create/src/apps/index"
import { PROJECT, TEMPLATES } from "../packages/create/src/catalog"
import type { Framework } from "../packages/create/src/catalog"
import { parseSkeletonId, skeletonId } from "../packages/create/src/choices"
import { composeProject } from "../packages/create/src/compose"
import { encodePreset, readDesignSystem } from "../registry/core/preset"

const ROOT = join(import.meta.dirname, "..")
const STATIC = join(ROOT, "apps", "site", "dist", "client")

/**
 * What CI installs: each framework once, React on both bases, across the toolings and the
 * workspaces (a Turborepo, a Vite+ monorepo), each in another style.
 */
const DEFAULT = [
  "react-base-nova@vite-react--none--eslint",
  "react-aria-lyra@tanstack-start--turbo--oxlint",
  "vue-ark-vega@vite-vue--none--biome",
  "svelte-ark-maia@vite-svelte--vite-plus--vite-plus",
  "solid-ark-mira@vite-solid--none--oxlint",
  "angular-ng-luma@analog-angular--none--eslint",
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
const versions = {
  kirana: catalog["@kirana-style/core"]!,
  vitePlus: catalog["vite-plus"]!,
}

const server = createServer((request, response) => {
  const file = join(STATIC, new URL(request.url ?? "/", "http://x").pathname)
  if (existsSync(file) && statSync(file).isFile()) {
    response.writeHead(200, { "content-type": "application/json" })
    response.end(readFileSync(file))
  } else {
    response.writeHead(404).end("not found")
  }
})
await new Promise<void>((resolve) => server.listen(0, resolve))
const { port } = server.address() as AddressInfo
const registry = `@kirana=http://localhost:${port}/r/{name}.json`

/** What a project's tree holds besides its own files. */
const GENERATED = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  ".output",
  ".nuxt",
  ".svelte-kit",
  ".angular",
  ".kirana",
  ".vinxi",
  ".tanstack",
  ".nitro",
  ".turbo",
  "out-tsc",
])

/** Every file under `root`, relative, outside the generated folders: the app's own files. */
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
function colourValues(app: string): string[] {
  const files = filesOf(app).filter((file) =>
    COLOUR_FILES.some((name) => file.endsWith(`/${name}`))
  )
  if (files.length !== COLOUR_FILES.length) {
    console.error(
      `install: ${COLOUR_FILES.join(", ")} not all installed in ${app}`
    )
    process.exit(1)
  }
  const found = new Set<string>()
  for (const file of files) {
    const text = readFileSync(join(app, file), "utf8")
    for (const match of text.matchAll(
      /data-(base-color|theme|chart-color)="([^"]+)"/g
    ))
      found.add(`${match[1]}=${match[2]}`)
    for (const match of text.matchAll(/^ {2}"?([a-z]+)"?: \{$/gm))
      found.add(`palette=${match[1]}`)
  }
  return [...found].sort()
}

function expectColours(app: string, expected: string[], when: string) {
  const found = colourValues(app)
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

/** Asynchronous, so the server above keeps answering while the command runs. */
async function run(cwd: string, command: string, ...args: string[]) {
  console.log(`$ ${[command, ...args].join(" ")}`)
  const status = await new Promise<number | null>((resolve) =>
    spawn(command, args, { cwd, stdio: "inherit" }).on("close", resolve)
  )
  if (status !== 0) {
    console.error(`install: ${command} ${args[0] ?? ""} failed in ${cwd}`)
    process.exit(1)
  }
}

const combinations = process.argv.slice(2)
for (const asked of combinations.length ? combinations : DEFAULT) {
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
  const preset = encodePreset(
    readDesignSystem(new URLSearchParams({ framework, base, style })).system
  )
  console.log(`\n== ${combination} ${id} (${preset})`)

  const folder = mkdtempSync(join(tmpdir(), `kirana-ui-${combination}-`))
  // The skeleton, as `giget` unpacks the site's tarball.
  const root = join(folder, PROJECT.directory)
  for (const [path, content] of composeProject(skeleton, versions, {
    packageManager: "bun",
  })) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), content)
  }
  const workspace = skeleton.monorepo !== "none"
  const app = workspace ? join(root, "apps", PROJECT.app) : root
  const example = APPS[skeleton.template]
  await run(root, "bun", "install")
  // Get Code's command: the design system installed with the preset, `data-pointer` on `<html>`.
  await run(
    app,
    "bunx",
    "kirana-style",
    "ui",
    "init",
    "--framework",
    framework,
    "--base",
    base,
    "--preset",
    preset,
    "--pointer",
    "--registry",
    registry
  )
  if (
    !/<html[^>]*\bdata-pointer\b/.test(
      readFileSync(join(app, example.document), "utf8")
    )
  ) {
    console.error(
      `install: init --pointer did not set data-pointer on <html> in ${example.document}`
    )
    process.exit(1)
  }
  // The preset's font is Inter: `init` installs its item, which imports the family's stylesheet.
  const sources = filesOf(app)
  if (
    !sources.some((file) =>
      readFileSync(join(app, file), "utf8").includes(
        '"@fontsource-variable/inter"'
      )
    )
  ) {
    console.error(`install: init did not import the preset's font in ${app}`)
    process.exit(1)
  }
  const items = itemsOf(framework, base)
  console.log(`install: ${items.length} items for ${framework} on ${base}`)
  await run(app, "bunx", "kirana-style", "ui", "add", ...items)
  // The style's preset has the default colours, whose values are the tokens' own: no entries,
  // and Neutral alone in each palette.
  expectColours(app, ["palette=neutral"], "installed")
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
    app,
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
  expectColours(app, ["palette=neutral"], `back at ${preset}`)
  // The skeleton's own scripts, from the workspace's root where there is one: the installed files
  // formatted (so `lint` and `typecheck` read them as the reader would commit them), linted,
  // type-checked and built again.
  const scripts = (
    JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>
    }
  ).scripts
  for (const script of ["format", "lint", "typecheck"])
    if (scripts[script]) await run(root, "bun", "run", script)
  if (scripts.check) await run(root, "bun", "run", "check")
  await run(root, "bun", "run", "build")
  await run(
    app,
    "bunx",
    "kirana-style",
    "ui",
    "validate",
    "kirana-style.lock.json"
  )
  rmSync(folder, { recursive: true, force: true })
}

server.close()
console.log("\ninstall: every combination installed, built and validated")
