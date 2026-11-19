import { fileURLToPath } from "node:url"

import kirana from "@kirana-style/vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import {
  browserAliases,
  browserDeps,
  browserTest,
} from "@workspace/vite-config/browser"
import {
  previewChunks,
  previewFonts,
  previewOutDir,
  previewPages,
} from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"
import { playwright } from "vite-plus/test/browser-playwright"

/**
 * The Svelte preview: the registry's `svelte-ark`, `svelte-bits`, `svelte-uisdk` and `svelte-kirana` items on their own page, compiled by Kirana's
 * adapter ahead of Svelte's plugin, so Svelte compiles the rewritten component (`sx={…}` becomes the
 * element's `class`). Built into the `ui` Worker's static files with a page per item and the
 * showcase (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/svelte/",
  build: {
    outDir: previewOutDir("svelte"),
    emptyOutDir: true,
    // A chunk per component, not per item: the Worker's 20,000 static files.
    rolldownOptions: previewChunks(),
  },
  plugins: lazyPlugins(() => [
    kirana(),
    svelte(),
    // The fonts from the site's own assets, not a copy per app.
    previewFonts(),
    previewPages({
      framework: "svelte",
      base: "ark",
      extension: ".svelte",
      extra: ["showcase", "charts"],
    }),
    previewPages({ framework: "svelte", base: "bits", extension: ".svelte" }),
    previewPages({ framework: "svelte", base: "uisdk", extension: ".svelte" }),
    previewPages({ framework: "svelte", base: "kirana", extension: ".svelte" }),
  ]),
  // The code block demos' text imports `@/components/…`, which the tests' dependency scan reads.
  resolve: {
    alias: browserAliases(
      fileURLToPath(import.meta.resolve("@workspace/vite-config/browser-stub"))
    ),
  },
  // Every example the tests can load.
  optimizeDeps: browserDeps([
    "test/**/*.{ts,svelte}",
    "../../registry/bases/svelte-{ark,bits,uisdk,kirana}/examples/*.svelte",
  ]),
  // The items in a real browser (`test/`), compiled as this app compiles them: `vp run browser`.
  test: browserTest(playwright, {
    name: "browser-svelte",
    setupFiles: ["test/setup.ts"],
  }),
})
