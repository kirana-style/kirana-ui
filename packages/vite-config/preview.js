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
 * How a preview's client build splits its items: one chunk per component per base (every
 * `button-*` example together), per chart kind (`chart-area-*`) and per block, where each item was
 * its own. The Worker serves at most 20,000 static files per version, and a chunk per item per base
 * was most of them (8,400 of 19,964 with three React and three Vue bases). A page loads its item's
 * siblings with it, a few kilobytes; the parts they share stay chunks of their own. Vue's, Svelte's,
 * Solid's and Angular's previews take it; React's does not: its maps load per base through a dynamic
 * import, and Rolldown kept a facade chunk per item (2,188 of 58 bytes), so grouping saved nothing.
 * React's takes `previewGroups()` instead.
 * Rolldown keeps the chunks valid without each group pulling its dependencies in when entries may
 * export more than their own signature and modules run in their order (`allow-extension`, its
 * `strictExecutionOrder`), and the map imports an item from its group rather than through a facade
 * chunk per item.
 * @returns {{ preserveEntrySignatures: "allow-extension", output: { strictExecutionOrder: boolean, codeSplitting: { includeDependenciesRecursively: boolean, groups: { name: (id: string) => string | null, debugName: string }[] } } }}
 */
export function previewChunks() {
  return {
    preserveEntrySignatures: "allow-extension",
    output: {
      strictExecutionOrder: true,
      codeSplitting: {
        includeDependenciesRecursively: false,
        groups: [{ name: itemGroup, debugName: "preview-items" }],
      },
    },
  }
}

/** What `JSON.stringify` leaves that a script must not hold as written, escaped. */
const UNSAFE = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
}

/**
 * A string as a JavaScript literal in generated code: `JSON.stringify` with the characters that
 * could end a script or a line escaped too. The values are the registry's own paths and group
 * names (`[a-z0-9-]`), never a reader's, but code is built from them, so they are escaped as any
 * value would be.
 * @param {string} value
 */
function literal(value) {
  return JSON.stringify(value).replace(
    /[<>\b\f\n\r\t\0\u2028\u2029]/g,
    (character) => UNSAFE[/** @type {keyof typeof UNSAFE} */ (character)]
  )
}

/**
 * React's items imported a group at a time (`itemGroup`'s groups: every `button-*` example of a
 * base together, a chart kind, a block), in its builds only. Each base's map (`previews.ts`)
 * imports an item by itself, `() => import("./examples/button-demo")`, which in React's build is a
 * chunk per item per base: 3,000 of the Worker's 20,000 static files with four bases, and grouping
 * them as `previewChunks()` does left a chunk per item that runs its module and re-exports it.
 * Here each such import becomes an import of its group's module, which imports the group's items
 * and names each, and the item is read from it: a chunk per group. Development and the browser
 * tests keep a module per item.
 * @returns {import("vite-plus").Plugin}
 */
export function previewGroups() {
  const PREFIX = "virtual:preview-group:"
  /** @type {Map<string, string[]>} each group's items' files, by the group's name */
  const groups = new Map()
  return {
    name: "preview-groups",
    apply: "build",
    enforce: "post",
    transform(code, id) {
      const file = id.split("?")[0].replaceAll("\\", "/")
      if (!/\/registry\/bases\/react-[a-z]+\/previews\.ts$/.test(file)) return
      const folder = file.slice(0, file.lastIndexOf("/") + 1)
      const out = code.replace(
        /\(\)\s*=>\s*import\(\s*["'](\.\/(?:examples|blocks|charts)\/[^"']+)["']\s*\)/g,
        (whole, relative) => {
          const target = folder + relative.slice(2)
          const group = itemGroup(target)
          if (!group) return whole
          const items = groups.get(group) ?? []
          if (!items.includes(target)) items.push(target)
          groups.set(group, items)
          const index = items.indexOf(target)
          return `() => import(${literal(PREFIX + group)}).then((m) => ({ default: m.i${index} }))`
        }
      )
      return out === code ? undefined : { code: out, map: null }
    },
    resolveId(id) {
      return id.startsWith(PREFIX) ? "\0" + id : undefined
    },
    load(id) {
      if (!id.startsWith("\0" + PREFIX)) return
      const items = groups.get(id.slice(PREFIX.length + 1)) ?? []
      return items
        .map(
          (file, index) =>
            `export { default as i${index} } from ${literal(file)}`
        )
        .join("\n")
    },
  }
}

/**
 * An item's group, from its path in the registry, or `null` for any other module.
 * @param {string} id
 */
function itemGroup(id) {
  const match =
    /\/registry\/bases\/([a-z-]+)\/(examples|charts|blocks)\/([a-z0-9-]+)/.exec(
      id.replaceAll("\\", "/")
    )
  if (!match) return null
  const [, base, kind, name] = match
  if (kind === "blocks") return `${base}-block-${name}`
  // `chart-area-default` → `area`; an example by its component's first word (`alert-dialog-demo`
  // → `alert`: a group, not a component, so a shared first word only joins two groups).
  const words = name.split("-")
  return kind === "charts"
    ? `${base}-chart-${words[1] ?? words[0]}`
    : `${base}-${words[0]}`
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
