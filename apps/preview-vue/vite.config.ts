import { fileURLToPath } from "node:url"

import kirana from "@kirana-style/vite"
import vue from "@vitejs/plugin-vue"
import {
  browserAliases,
  browserDeps,
  browserTest,
} from "@workspace/vite-config/browser"
import { previewOutDir, previewPages } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"
import { playwright } from "vite-plus/test/browser-playwright"

/**
 * The Vue preview: the registry's `vue-ark` and `vue-reka` items on their own page, compiled by Kirana's adapter
 * ahead of Vue's plugin so `:sx` in templates reaches Vue as `class`. Built into the `ui` Worker's
 * static files with a page per item and the showcase (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/vue/",
  build: { outDir: previewOutDir("vue"), emptyOutDir: true },
  plugins: lazyPlugins(() => [
    kirana(),
    vue(),
    previewPages({
      framework: "vue",
      base: "ark",
      extension: ".vue",
      extra: ["showcase", "charts"],
    }),
    previewPages({ framework: "vue", base: "reka", extension: ".vue" }),
  ]),
  // The code block demos' text imports `@/components/…`, which the tests' dependency scan reads.
  resolve: {
    alias: browserAliases(
      fileURLToPath(import.meta.resolve("@workspace/vite-config/browser-stub"))
    ),
  },
  // Every example the tests can load.
  optimizeDeps: browserDeps([
    "test/**/*.{ts,vue}",
    "../../registry/bases/vue-{ark,reka}/examples/*.vue",
  ]),
  // The items in a real browser (`test/`), compiled as this app compiles them: `vp run browser`.
  test: browserTest(playwright, {
    name: "browser-vue",
    setupFiles: ["test/setup.ts"],
  }),
})
