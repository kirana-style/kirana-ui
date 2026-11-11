// @ts-check
/**
 * What every framework's preview app builds the same way: into the `ui` Worker's static files
 * (`apps/site/dist/client/preview/<framework>/`, after the site's build has written that folder):
 * one page, the app's, which the site's `_redirects` serves at `/preview/<framework>/<base>/<item>`
 * without running the Worker.
 */
import { existsSync, readFileSync } from "node:fs"
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
 * Checks the preview's routes are served: the site's `_redirects` serves the app's one page at
 * every `/preview/<framework>/<base>/<item>` (a 200 rewrite, without running the Worker), where a
 * copy of the page per item would count against the Worker's 20,000 static files. The build fails
 * when the rule for this framework and base is missing. `extra` names the app's own pages
 * (`showcase`, `charts`), which the comparison script reads from here.
 * @param {{ framework: string, base: string, extension: string, extra?: readonly string[] }} options
 * @returns {import("vite-plus").Plugin}
 */
export function previewPages({ framework, base }) {
  const redirects = fileURLToPath(
    new URL("../../apps/site/public/_redirects", import.meta.url)
  )
  // The app's page at its canonical URL, `/preview/<framework>/`: a rewrite to `index.html` would
  // loop, since Cloudflare serves that page at the folder's URL.
  const rule = `/preview/${framework}/${base}/* /preview/${framework}/ 200`
  return {
    name: "preview-item-routes",
    apply: "build",
    buildStart() {
      const lines = existsSync(redirects)
        ? readFileSync(redirects, "utf8")
            .split("\n")
            .map((line) => line.trim())
        : []
      if (!lines.includes(rule))
        this.error(
          `${framework} on ${base}: apps/site/public/_redirects has no "${rule}", so its item pages would not be served`
        )
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
