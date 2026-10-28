// @ts-check
/**
 * What every framework's preview app builds the same way: into the `ui` Worker's static files
 * (`apps/site/dist/client/preview/<framework>/`, after the site's build has written that folder),
 * with a copy of the app's page for every example and for the showcase, named as its route
 * (`<base>/<item>.html`), which Cloudflare serves at `/preview/<framework>/<base>/<item>` without
 * running the Worker.
 */
import { copyFileSync, mkdirSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"

/**
 * The folder a framework's preview builds into.
 * @param {string} framework
 */
export function previewOutDir(framework) {
  return fileURLToPath(
    new URL(
      `../../apps/site/dist/client/preview/${framework}/`,
      import.meta.url
    )
  )
}

/**
 * A page for every example under `registry/bases/<framework>-<base>/examples/` with `extension`,
 * and for `extra` names (`showcase`), copied from the built `index.html`.
 * @param {{ framework: string, base: string, extension: string, extra?: readonly string[] }} options
 * @returns {import("vite-plus").Plugin}
 */
export function previewPages({ framework, base, extension, extra = [] }) {
  const outDir = previewOutDir(framework)
  const examples = fileURLToPath(
    new URL(
      `../../registry/bases/${framework}-${base}/examples/`,
      import.meta.url
    )
  )
  return {
    name: "preview-item-pages",
    apply: "build",
    closeBundle() {
      mkdirSync(`${outDir}${base}`, { recursive: true })
      const names = [
        ...readdirSync(examples)
          .filter((file) => file.endsWith(extension))
          .map((file) => file.slice(0, -extension.length)),
        ...extra,
      ]
      for (const name of names)
        copyFileSync(`${outDir}index.html`, `${outDir}${base}/${name}.html`)
    },
  }
}
