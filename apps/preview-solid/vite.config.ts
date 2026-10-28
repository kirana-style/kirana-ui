import kirana from "@kirana-style/vite"
import { previewOutDir, previewPages } from "@workspace/vite-config/preview"
import solid from "vite-plugin-solid"
import { defineConfig, lazyPlugins } from "vite-plus"

/**
 * The Solid preview: the registry's `solid-ark` items on their own page, compiled by Kirana's
 * adapter (`sx` becomes `class`, as `jsxImportSource: "solid-js"` selects) and then Solid's. Built
 * into the `ui` Worker's static files with a page per item and the showcase
 * (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/solid/",
  build: { outDir: previewOutDir("solid"), emptyOutDir: true },
  plugins: lazyPlugins(() => [
    kirana(),
    solid(),
    previewPages({
      framework: "solid",
      base: "ark",
      extension: ".tsx",
      extra: ["showcase"],
    }),
  ]),
})
