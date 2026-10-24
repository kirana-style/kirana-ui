import { copyFileSync, mkdirSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"

import kirana from "@kirana-style/vite"
import vue from "@vitejs/plugin-vue"
import type { Plugin } from "vite-plus"
import { defineConfig, lazyPlugins } from "vite-plus"

/**
 * The Vue preview: the registry's `vue-ark` items on their own page, compiled by Kirana's adapter
 * ahead of Vue's plugin so `:sx` in templates reaches Vue as `class`.
 *
 * It is built into the `ui` Worker's static files (`apps/web/dist/client/preview/vue/`, after the
 * demo's build has written that folder), with a page per item, `ark/<item>.html`, which Cloudflare
 * serves at `/preview/vue/ark/<item>` without running the Worker.
 */
const OUT_DIR = fileURLToPath(
  new URL("../web/dist/client/preview/vue/", import.meta.url)
)
const EXAMPLES = new URL(
  "../../registry/bases/vue-ark/examples/",
  import.meta.url
)

/** A copy of the app's page for every item, named as its route. */
function itemPages(): Plugin {
  return {
    name: "preview-item-pages",
    apply: "build",
    closeBundle() {
      mkdirSync(`${OUT_DIR}ark`, { recursive: true })
      for (const file of readdirSync(EXAMPLES)) {
        if (!file.endsWith(".vue")) continue
        copyFileSync(
          `${OUT_DIR}index.html`,
          `${OUT_DIR}ark/${file.slice(0, -4)}.html`
        )
      }
    },
  }
}

export default defineConfig({
  base: "/preview/vue/",
  build: { outDir: OUT_DIR, emptyOutDir: true },
  plugins: lazyPlugins(() => [kirana(), vue(), itemPages()]),
})
