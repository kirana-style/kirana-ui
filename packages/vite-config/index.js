// @ts-check
/**
 * The Vite setup every app in this repo shares: TanStack Start, React, the
 * TanStack devtools, and Kirana compiled by `@kirana-style/vite`.
 *
 * Plain ESM rather than TypeScript, so Vite's config loader can import it from
 * the workspace without transpiling a dependency.
 */
import { cloudflare } from "@cloudflare/vite-plugin"
import kirana from "@kirana-style/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { lazyPlugins } from "vite-plus"

/**
 * @param {{ cloudflare?: boolean, prerender?: boolean, pages?: string[], elsewhere?: string[], plugins?: import("vite").PluginOption[] }} [options]
 *   `cloudflare`: the app deploys as a Cloudflare Worker (its `wrangler.jsonc`); `vite dev` and `vite build` then run the server half
 *   inside workerd, the runtime production uses, so a Node-only API fails locally rather than after
 *   deploying. `prerender`: `vite build` renders every page it can reach from `/` into the static
 *   files, which are served without running the server; `pages` adds paths no link reaches, and
 *   `elsewhere` names the path prefixes another build writes into the same static files (a
 *   preview app's), which the crawl leaves alone, as it leaves the `.md` and `.txt` files the app
 *   writes itself.
 *   `plugins`: the app's own, ahead of Kirana's.
 * @returns {import("vite").UserConfigFnObject}
 */
export function defineAppConfig(options = {}) {
  return defineConfig(() => ({
    resolve: { tsconfigPaths: true },
    // `vp run` reads every package's config to find its tasks; `lazyPlugins` leaves the plugins
    // (and the native engine the Kirana plugin opens) out of that read and in for every build,
    // dev server and test.
    plugins: lazyPlugins(() => [
      // First: it takes over the "ssr" environment before TanStack Start configures it.
      ...(options.cloudflare
        ? [cloudflare({ viteEnvironment: { name: "ssr" } })]
        : []),
      // Console piping is off: it sends client logs to the terminal and server
      // logs back to the browser console, so one `console.error` echoes between
      // the two and multiplies until the tab is closed. Everything else the
      // devtools do is kept.
      devtools({ consolePiping: { enabled: false } }),
      ...(options.plugins ?? []),
      // Ahead of the framework plugins, so modules reach them already compiled.
      // Layers, targets and diagnostics come from each app's kirana.config.ts.
      kirana(),
      tanstackStart({
        router: { quoteStyle: "double", semicolons: false },
        pages: (options.pages ?? []).map((path) => ({ path })),
        ...(options.prerender
          ? {
              prerender: {
                enabled: true,
                crawlLinks: true,
                failOnError: true,
                // A static file the app writes itself (a docs page's markdown twin, `llms.txt`)
                // is copied as it is: crawled, its text would be read for links, the relative
                // links in its code samples included.
                filter: (/** @type {{ path: string }} */ { path }) =>
                  !/\.(md|txt)$/.test(path.split(/[?#]/)[0] ?? path) &&
                  !(options.elsewhere ?? []).some((prefix) =>
                    path.startsWith(prefix)
                  ),
                // `docs.html`, not `docs/index.html`: Cloudflare serves the first at `/docs` and
                // redirects `/docs` to `/docs/` for the second.
                autoSubfolderIndex: false,
              },
            }
          : {}),
      }),
      viteReact(),
    ]),
    build: {
      cssMinify: true,
      minify: true,
      // Published beside the bundles, so a stack trace from the deployed site, and Lighthouse's
      // look at the largest chunks, read the source. The code is open source anyway.
      sourcemap: true,
      // Kirana's browser floor (Chrome 123, Safari 17.5, Firefox 120), the first versions with
      // `light-dark()`. Vite's default target is older, so its CSS minifier would rewrite
      // `light-dark()` in plain stylesheets into `--lightningcss-light/dark` switches that nothing
      // sets, and every colour written there would vanish in production only.
      cssTarget: ["chrome123", "safari17.5", "firefox120"],
    },
  }))
}
