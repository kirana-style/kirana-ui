import type { Plugin } from "vite-plus"

/** The folder a framework's preview builds into. */
export function previewOutDir(framework: string): string

/**
 * Checks the site's `_redirects` serves the app's page at every `/preview/<framework>/<base>/<item>`;
 * `extra` names the app's own pages, for the comparison script.
 */
export function previewPages(options: {
  framework: string
  base: string
  extension: string
  extra?: readonly string[]
}): Plugin

/**
 * `virtual:design-script`: the module at `entry` bundled on its own and minified, as a string a
 * page writes inline before the first paint.
 */
export function designScript(entry: string): Plugin

/**
 * How a preview's client build splits its items: one chunk per component per base, per chart kind
 * and per block, so the Worker's 20,000 static files hold.
 */
export function previewChunks(): {
  preserveEntrySignatures: "allow-extension"
  output: {
    strictExecutionOrder: boolean
    codeSplitting: {
      includeDependenciesRecursively: boolean
      groups: { name: (id: string) => string | null; debugName: string }[]
    }
  }
}
export function previewGroups(): Plugin
