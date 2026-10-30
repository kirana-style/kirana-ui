import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { fileURLToPath, pathToFileURL } from "node:url"

import kirana from "@kirana-style/vite"
import type * as Server from "./src/server"
import react from "@vitejs/plugin-react"
import { designScript, previewOutDir } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"

const OUT = previewOutDir("react")
const SERVER = fileURLToPath(new URL("dist/server/", import.meta.url))
const SCRIPT = fileURLToPath(
  new URL("../../registry/core/preview-script.ts", import.meta.url)
)

/**
 * Every item's page, `<base>/<item>.html`, which Cloudflare serves at `/preview/react/<base>/<item>`
 * without running the Worker: the server build renders each into the built `index.html`, which is
 * then removed (a name no base has is the site's 404).
 */
async function prerender() {
  const server = (await import(
    pathToFileURL(`${SERVER}server.js`).href
  )) as typeof Server
  const template = readFileSync(`${OUT}index.html`, "utf8")
  for (const [base, item] of await server.previewPages()) {
    mkdirSync(`${OUT}${base}`, { recursive: true })
    writeFileSync(
      `${OUT}${base}/${item}.html`,
      await server.renderPage(template, base, item)
    )
  }
  rmSync(`${OUT}index.html`)
}

/**
 * The React preview: the registry's `react-base` and `react-aria` items on their own page, as the
 * other frameworks' previews are, apart from the site so its pages do not carry every item's styles
 * (KF-052). Unlike theirs, each page is prerendered: the client build, then a server build
 * (`src/server.tsx`) that renders every item into the client's `index.html`. The client loads the
 * item before hydrating, so the prerendered item stays on screen. Built into the `ui` Worker's
 * static files (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/react/",
  build: {
    outDir: OUT,
    emptyOutDir: true,
    sourcemap: true,
    // Kirana's browser floor, as the site's (`@workspace/vite-config`): an older target would
    // rewrite `light-dark()` in plain stylesheets.
    cssTarget: ["chrome123", "safari17.5", "firefox120"],
  },
  environments: {
    ssr: {
      build: {
        outDir: SERVER,
        emptyOutDir: true,
        rollupOptions: { input: "src/server.tsx" },
      },
    },
  },
  // Every dependency in the server build: the workspace installs each package's own, so the
  // registry's (Base UI, Sonner…) are not reachable from this app's folder at prerender.
  ssr: { noExternal: true },
  builder: {
    async buildApp(builder) {
      await builder.build(builder.environments.client)
      await builder.build(builder.environments.ssr)
      await prerender()
    },
  },
  plugins: lazyPlugins(() => [designScript(SCRIPT), kirana(), react()]),
})
