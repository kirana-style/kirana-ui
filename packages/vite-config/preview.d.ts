import type { Plugin } from "vite-plus"

/** The folder a framework's preview builds into. */
export function previewOutDir(framework: string): string

/** A page for every example of `<framework>-<base>` with `extension`, and for `extra` names. */
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
