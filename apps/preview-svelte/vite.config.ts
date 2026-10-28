import kirana from "@kirana-style/vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { previewOutDir, previewPages } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"

/**
 * The Svelte preview: the registry's `svelte-ark` items on their own page, compiled by Kirana's
 * adapter ahead of Svelte's plugin, so Svelte compiles the rewritten component (`sx={…}` becomes the
 * element's `class`). Built into the `ui` Worker's static files with a page per item and the
 * showcase (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/svelte/",
  build: { outDir: previewOutDir("svelte"), emptyOutDir: true },
  plugins: lazyPlugins(() => [
    kirana(),
    svelte(),
    previewPages({
      framework: "svelte",
      base: "ark",
      extension: ".svelte",
      extra: ["showcase"],
    }),
  ]),
})
