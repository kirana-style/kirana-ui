import type { PluginOption, UserConfigFnObject } from "vite"

/**
 * The Vite config every app in this repo shares. `cloudflare: true` builds the app as a Cloudflare
 * Worker (its `wrangler.jsonc`) and runs the server half in workerd during `vite dev` too.
 * `prerender: true` renders every page reachable from `/` into the static files at build time, and
 * `pages` the paths no link reaches; `elsewhere` the path prefixes another build writes into the same
 * static files (a preview app's), which the crawl skips. `plugins` are the app's own, ahead of
 * Kirana's.
 */
export function defineAppConfig(options?: {
  cloudflare?: boolean
  prerender?: boolean
  pages?: string[]
  elsewhere?: string[]
  plugins?: PluginOption[]
}): UserConfigFnObject
