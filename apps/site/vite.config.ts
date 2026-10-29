import { spawn } from "node:child_process"
import { createReadStream, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { build } from "vite-plus"
import type { Plugin } from "vite-plus"
import { defineAppConfig } from "@workspace/vite-config"

const REGISTRY = fileURLToPath(new URL("../../registry/", import.meta.url))

/**
 * Every React preview page, `/preview/react/<base>/<item>`: each base's examples, blocks and charts, the
 * items its `previews.ts` maps; and the typeset builder's, `/preview/typeset/<item>`.
 */
function previewPages() {
  return ["base", "aria"]
    .flatMap((base) => {
      const folder = `${REGISTRY}bases/react-${base}/`
      const examples = readdirSync(`${folder}examples`)
        .filter((file) => file.endsWith(".tsx"))
        .map((file) => file.slice(0, -4))
      const blocks = readdirSync(`${folder}blocks`)
      const charts = readdirSync(`${folder}charts`)
        .filter((file) => file.endsWith(".tsx"))
        .map((file) => file.slice(0, -4))
      return [...examples, ...blocks, ...charts].map(
        (item) => `/preview/react/${base}/${item}`
      )
    })
    .concat(
      // The typeset builder's content (`src/lib/typeset.ts`'s `TYPESET_ITEMS`).
      ["docs", "chat", "article", "changelog", "notes"].map(
        (item) => `/preview/typeset/${item}`
      )
    )
}

/** The design script's module: `import designScript from "virtual:design-script"`. */
const DESIGN_SCRIPT = "virtual:design-script"

/**
 * `virtual:design-script`: `registry/core/design-script.ts` bundled on its own and minified, as a
 * string the root writes inline before the first paint (X-7). Bundled apart from the app so it
 * carries the decoder and nothing else; bundled again when the script changes.
 */
function designScript(): Plugin {
  const entry = `${REGISTRY}core/design-script.ts`
  let bundled: Promise<string> | undefined
  const bundle = async () => {
    const output = await build({
      configFile: false,
      logLevel: "silent",
      build: {
        write: false,
        minify: true,
        lib: { entry, formats: ["iife"], name: "designScript" },
      },
    })
    const [result] = Array.isArray(output) ? output : [output]
    return "output" in result ? result.output[0].code.trim() : ""
  }
  return {
    name: "design-script",
    resolveId(id) {
      if (id === DESIGN_SCRIPT) return `\0${DESIGN_SCRIPT}`
    },
    async load(id) {
      if (id !== `\0${DESIGN_SCRIPT}`) return
      this.addWatchFile(entry)
      return `export default ${JSON.stringify(await (bundled ??= bundle()))}`
    },
    watchChange(id) {
      if (id === entry) bundled = undefined
    },
  }
}

/**
 * `/r` in development. The registry's JSON is written into the build's static files
 * (`dist/client/r`, `vp run registry`), which the dev server does not serve, so the code panels and
 * the blocks' code read nothing there. This serves the same folder, and writes it first, without
 * the flattening check, when it is missing. It is what the last `vp run registry` wrote: a change
 * to the registry's sources shows in the code after `vp run registry` again.
 */
function registryInDev(): Plugin {
  const root = fileURLToPath(new URL("../../", import.meta.url))
  const folder = fileURLToPath(new URL("dist/client/r/", import.meta.url))
  let writing: Promise<void> | undefined
  const written = () =>
    (writing ??= existsSync(folder)
      ? Promise.resolve()
      : new Promise((done) => {
          spawn("bun", ["packages/builder/src/cli.ts", "--skip-check"], {
            cwd: root,
            stdio: "inherit",
          }).on("exit", () => done())
        }))
  return {
    name: "registry-in-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split("?")[0] ?? ""
        if (!path.startsWith("/r/")) return next()
        void written().then(() => {
          const file = join(folder, decodeURIComponent(path.slice(3)))
          if (!file.startsWith(folder) || !existsSync(file)) return next()
          response.setHeader("Content-Type", "application/json")
          createReadStream(file).pipe(response)
        })
      })
    },
  }
}

// The site deploys as the Cloudflare Worker `ui` (wrangler.jsonc), its pages prerendered into the
// static files the Worker's assets serve: those reached from `/`, and every preview.
export default defineAppConfig({
  cloudflare: true,
  prerender: true,
  pages: previewPages(),
  plugins: [designScript(), registryInDev()],
})
