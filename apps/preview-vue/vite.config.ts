import kirana from "@kirana-style/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig, lazyPlugins } from "vite-plus"

// The Vue preview: the registry's `vue-ark` components on their own page, compiled by Kirana's
// adapter ahead of Vue's plugin so `:sx` in templates reaches Vue as `class`.
export default defineConfig({
  base: "/preview/vue/",
  // KF-001: the compiled output imports Kirana's runtime, which no source names, so the first
  // request would re-optimise it. Remove with the Kirana release that carries the fix.
  optimizeDeps: { include: ["@kirana-style/core/internal"] },
  plugins: lazyPlugins(() => [kirana(), vue()]),
})
