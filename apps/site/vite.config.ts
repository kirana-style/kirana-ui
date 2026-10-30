import { spawn } from "node:child_process"
import type { ChildProcess } from "node:child_process"
import { createReadStream, existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import type { Plugin } from "vite-plus"
import { defineAppConfig } from "@workspace/vite-config"
import { designScript } from "@workspace/vite-config/preview"

const REGISTRY = fileURLToPath(new URL("../../registry/", import.meta.url))

/**
 * The typeset builder's preview pages, `/preview/typeset/<item>` (`src/lib/typeset.ts`'s
 * `TYPESET_ITEMS`), which no link reaches. The React previews are their own app
 * (`apps/preview-react`), built into this site's static files.
 */
const TYPESET_PAGES = ["docs", "chat", "article", "changelog", "notes"].map(
  (item) => `/preview/typeset/${item}`
)

/** The React previews' names: `import names from "virtual:react-preview-names"`. */
const PREVIEW_NAMES = "virtual:react-preview-names"

/**
 * `virtual:react-preview-names`: the items `/preview/react/<base>/<item>` answers to, per base,
 * read from each base's `previews.ts` (its keys) at build time. `/create`'s explorer lists them;
 * importing the maps themselves would put every item, and so its styles, into the site's build
 * (KF-052).
 */
function reactPreviewNames(): Plugin {
  const files = {
    "react/base": `${REGISTRY}bases/react-base/previews.ts`,
    "react/aria": `${REGISTRY}bases/react-aria/previews.ts`,
  }
  return {
    name: "react-preview-names",
    resolveId(id) {
      if (id === PREVIEW_NAMES) return `\0${PREVIEW_NAMES}`
    },
    load(id) {
      if (id !== `\0${PREVIEW_NAMES}`) return
      const names = Object.fromEntries(
        Object.entries(files).map(([variant, file]) => {
          this.addWatchFile(file)
          const source = readFileSync(file, "utf8")
          return [
            variant,
            [...source.matchAll(/^ {2}"([^"]+)":/gm)].map(([, name]) => name),
          ]
        })
      )
      return `export default ${JSON.stringify(names)}`
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

/** Each framework's preview app and the port its dev server takes (its `dev` script). */
const PREVIEW_PORTS = {
  react: 3007,
  vue: 3003,
  svelte: 3004,
  solid: 3005,
  angular: 3006,
}

/**
 * The previews in development: the site's dev server forwards `/preview/<framework>/` to that
 * preview app's, so the docs, `/create` and the home showcase frame them as the built site does.
 * The first request for a framework starts its dev server when none answers on its port (`vp run
 * dev` starts them all already), and the site's stops what it started. A server that does not
 * come up answers 502 rather than leaving the frame waiting: a closed port can hang a connection
 * instead of refusing it.
 */
function previewsInDev(): Plugin {
  const APPS = fileURLToPath(new URL("../", import.meta.url))
  const answers = (port: number) =>
    fetch(`http://localhost:${port}/`, { signal: AbortSignal.timeout(1000) })
      .then(() => true)
      .catch(() => false)
  const children: ChildProcess[] = []
  const ready = new Map<string, Promise<boolean>>()
  const start = async (framework: keyof typeof PREVIEW_PORTS) => {
    const port = PREVIEW_PORTS[framework]
    if (await answers(port)) return true
    // `--strictPort`: when another dev server is still taking the port, this one leaves it to it.
    const child = spawn("bun", ["run", "dev", "--strictPort"], {
      cwd: `${APPS}preview-${framework}`,
      stdio: ["ignore", "ignore", "inherit"],
    })
    children.push(child)
    for (let tries = 0; tries < 90; tries++) {
      if (await answers(port)) return true
      await new Promise((done) => setTimeout(done, 1000))
    }
    return false
  }
  return {
    name: "previews-in-dev",
    apply: "serve",
    config: () => ({
      server: {
        proxy: Object.fromEntries(
          Object.entries(PREVIEW_PORTS).map(([framework, port]) => [
            `/preview/${framework}/`,
            { target: `http://localhost:${port}`, ws: true },
          ])
        ),
      },
    }),
    configureServer(server) {
      // Ahead of Vite's own middlewares, the proxy among them: it runs once the server answers.
      server.middlewares.use((request, response, next) => {
        const framework = request.url?.match(/^\/preview\/([a-z]+)\//)?.[1]
        if (!framework || !(framework in PREVIEW_PORTS)) return next()
        const key = framework as keyof typeof PREVIEW_PORTS
        let starting = ready.get(key)
        if (!starting) {
          starting = start(key)
          ready.set(key, starting)
        }
        void starting.then((up) => {
          if (up) return next()
          ready.delete(key)
          response.statusCode = 502
          response.end(
            `The ${framework} preview's dev server (apps/preview-${framework}, port ${PREVIEW_PORTS[key]}) did not start.`
          )
        })
      })
      server.httpServer?.once("close", () => {
        for (const child of children) child.kill()
      })
    },
  }
}

// The site deploys as the Cloudflare Worker `ui` (wrangler.jsonc), its pages prerendered into the
// static files the Worker's assets serve: those reached from `/`, and the typeset previews.
export default defineAppConfig({
  cloudflare: true,
  prerender: true,
  pages: TYPESET_PAGES,
  // Each framework's preview app writes its own pages (`@workspace/vite-config/preview`).
  elsewhere: ["react", "vue", "svelte", "solid", "angular"].map(
    (framework) => `/preview/${framework}/`
  ),
  plugins: [
    designScript(`${REGISTRY}core/design-script.ts`),
    reactPreviewNames(),
    registryInDev(),
    previewsInDev(),
  ],
})
