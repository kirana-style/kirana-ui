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

import { build } from "vite-plus"

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

/** The design script's module: `import designScript from "virtual:design-script"`. */
const DESIGN_SCRIPT = "virtual:design-script"

/**
 * `virtual:design-script`: a script module (`registry/core/design-script.ts` on the site's pages,
 * `preview-script.ts` on the React previews) bundled on its own and minified, as a string the page
 * writes inline before the first paint (X-7). Bundled apart from the app so it carries the decoder
 * and nothing else; bundled again when the script changes.
 * @param {string} entry the module's path
 * @returns {import("vite-plus").Plugin}
 */
export function designScript(entry) {
  /** @type {Promise<string> | undefined} */
  let bundled
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
