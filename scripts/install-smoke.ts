/**
 * The registry installed as a project installs it, with Kirana's own installer: for each
 * combination, a new project from Kirana's example for its framework, started from an empty folder
 * (`npx @kirana-style/registry init --template`, which reads the release's source from GitHub), set
 * to that style's preset code (which installs its font), the slice added with `kirana-style ui add`
 * from the registry this checkout built, then built (and type-checked with `vue-tsc` for Vue), and
 * its lockfile validated. The colour axes are checked to hold the design's values only (the
 * `kirana` item's per-value builds), and again after `ui preset` to another design and back. Exits
 * non-zero on the first failure.
 *
 *   bun scripts/install-smoke.ts [<framework>-<base>-<style> …]   # what `vp run install` runs
 *
 * Needs the site and its registry built (`vp run registry`); serves `apps/site/dist/client` itself.
 * The computed-style comparison of installed against live stays a browser run, outside CI.
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
import { gzipSync } from "node:zlib"
import type { AddressInfo } from "node:net"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { encodePreset, readDesignSystem } from "../registry/core/preset"

const ROOT = join(import.meta.dirname, "..")
const STATIC = join(ROOT, "apps", "site", "dist", "client")

/** What CI installs: the default, a flattened style on the second React base, and Vue. */
const DEFAULT = ["react-base-nova", "react-aria-lyra", "vue-ark-vega"]

/** The slice, per framework: Vue has every component it has so far. */
const ITEMS = {
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

const version = (
  JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
    workspaces: { catalog: Record<string, string> }
  }
).workspaces.catalog["@kirana-style/core"]

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
  const files = readdirSync(join(app, "src"), {
    recursive: true,
    encoding: "utf8",
  }).filter((file) => COLOUR_FILES.some((name) => file.endsWith(`/${name}`)))
  if (files.length !== COLOUR_FILES.length) {
    console.error(
      `install: ${COLOUR_FILES.join(", ")} not all installed in ${app}`
    )
    process.exit(1)
  }
  const found = new Set<string>()
  for (const file of files) {
    const text = readFileSync(join(app, "src", file), "utf8")
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
function stylesheetSize(app: string) {
  const dist = join(app, "dist")
  const css = readdirSync(dist, { recursive: true, encoding: "utf8" }).filter(
    (file) => file.endsWith(".css")
  )
  const bytes = css.reduce(
    (sum, file) => sum + gzipSync(readFileSync(join(dist, file))).length,
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
for (const combination of combinations.length ? combinations : DEFAULT) {
  const [framework, base, style] = combination.split("-") as [
    keyof typeof ITEMS,
    string,
    string,
  ]
  if (!(framework in ITEMS) || !base || !style) {
    console.error(`install: not a combination: ${combination}`)
    process.exit(2)
  }
  // The code the site's customizer gives this combination, with the rules between axes applied.
  const preset = encodePreset(
    readDesignSystem(new URLSearchParams({ framework, base, style })).system
  )
  console.log(`\n== ${combination} (${preset})`)

  const folder = mkdtempSync(join(tmpdir(), `kirana-ui-${combination}-`))
  // From an empty folder, as a new user starts: the registry package runs on its own, and the
  // project it writes has the registry at this exact version, so `ui` runs there.
  await run(
    folder,
    "bunx",
    `@kirana-style/registry@${version}`,
    "init",
    "--template",
    `vite-${framework}`,
    "app",
    "--framework",
    framework,
    "--base",
    base,
    "--preset",
    preset,
    // Get Code's "Use pointer on buttons": `data-pointer` on `<html>`, which the reset reads.
    "--pointer",
    "--registry",
    registry
  )
  const app = join(folder, "app")
  if (
    !/<html[^>]*\bdata-pointer\b/.test(
      readFileSync(join(app, "index.html"), "utf8")
    )
  ) {
    console.error(
      `install: init --pointer did not set data-pointer on <html> in ${app}`
    )
    process.exit(1)
  }
  // The preset's font is Inter: `init` installs its item, which imports the family's stylesheet.
  const sources = readdirSync(join(app, "src"), {
    recursive: true,
    encoding: "utf8",
  })
  if (
    !sources.some(
      (file) =>
        /\.(ts|tsx|js|vue)$/.test(file) &&
        readFileSync(join(app, "src", file), "utf8").includes(
          '"@fontsource-variable/inter"'
        )
    )
  ) {
    console.error(`install: init did not import the preset's font in ${app}`)
    process.exit(1)
  }
  await run(app, "bunx", "kirana-style", "ui", "add", ...ITEMS[framework])
  // The style's preset has the default colours, whose values are the tokens' own: no entries,
  // and Neutral alone in each palette.
  expectColours(app, ["palette=neutral"], "installed")
  await run(app, "bun", "run", "build")
  console.log(`install: stylesheets ${stylesheetSize(app)}`)
  // Another design's colours replace the modules, and coming back leaves none of them.
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
  await run(app, "bun", "run", "build")
  await run(app, "bunx", "kirana-style", "ui", "preset", preset)
  expectColours(app, ["palette=neutral"], `back at ${preset}`)
  await run(app, "bun", "run", "build")
  // Vue templates are type-checked in the project only: Ark's required props show there (CLI-06).
  if (framework === "vue") await run(app, "bun", "run", "typecheck")
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
