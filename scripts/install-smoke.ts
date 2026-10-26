/**
 * The registry installed as a project installs it, with Kirana's own installer: for each
 * combination, a new project from Kirana's example for its framework (`kirana-style ui init
 * --template`, which reads the release's source from GitHub), set to that style's preset code, the
 * slice added with `kirana-style ui add` from the registry this checkout built, then built, and its
 * lockfile validated. Exits non-zero on the first failure.
 *
 *   bun scripts/install-smoke.ts [<framework>-<base>-<style> …]   # what `vp run install` runs
 *
 * Needs the site and its registry built (`vp run registry`); serves `apps/web/dist/client` itself.
 * The computed-style comparison of installed against live stays a browser run, outside CI.
 */
import { spawn } from "node:child_process"
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { createServer } from "node:http"
import type { AddressInfo } from "node:net"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { encodePreset, readDesignSystem } from "../registry/core/preset"

const ROOT = join(import.meta.dirname, "..")
const STATIC = join(ROOT, "apps", "web", "dist", "client")

/** What CI installs: the default, a flattened style on the second React base, and Vue. */
const DEFAULT = ["react-base-nova", "react-aria-lyra", "vue-ark-vega"]

/** The slice, per framework: Vue has five of its components. */
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
  ],
  vue: ["button", "dialog", "select", "dropdown-menu", "tabs"],
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
  // `ui` runs from a project that has @kirana-style/registry, and `init --template` does not give
  // the new project one (KF-035 in Kirana's feedback log): the folder and the app each get it.
  writeFileSync(
    join(folder, "package.json"),
    '{ "name": "bootstrap", "private": true }\n'
  )
  await run(
    folder,
    "bun",
    "add",
    "-d",
    `@kirana-style/registry@${version}`,
    `kirana-style@${version}`
  )
  await run(
    folder,
    "bunx",
    "kirana-style",
    "ui",
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
    "--registry",
    registry
  )
  const app = join(folder, "app")
  await run(app, "bun", "add", "-d", `@kirana-style/registry@${version}`)
  await run(app, "bunx", "kirana-style", "ui", "add", ...ITEMS[framework])
  await run(app, "bun", "run", "build")
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
