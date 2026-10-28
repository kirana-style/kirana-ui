import kirana from "@kirana-style/vite"
import vue from "@vitejs/plugin-vue"
import { previewOutDir, previewPages } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"

/**
 * The Vue preview: the registry's `vue-ark` items on their own page, compiled by Kirana's adapter
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
      extra: ["showcase"],
    }),
  ]),
})
