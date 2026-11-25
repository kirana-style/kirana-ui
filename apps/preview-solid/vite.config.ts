import { fileURLToPath } from "node:url"

import kirana from "@kirana-style/vite"
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
import solid from "vite-plugin-solid"
import { defineConfig, lazyPlugins } from "vite-plus"
import { playwright } from "vite-plus/test/browser-playwright"

/**
 * The Solid preview, on Solid 1: the registry's `solid-ark` items on their own page (Solid's other
 * bases are Solid 2's, `apps/preview-solid2`), compiled by Kirana's
 * adapter (`sx` becomes `class`, as `jsxImportSource: "solid-js"` selects) and then Solid's. Built
 * into the `ui` Worker's static files with a page per item and the showcase
 * (`@workspace/vite-config/preview`).
 */
export default defineConfig({
  base: "/preview/solid/",
  build: {
    outDir: previewOutDir("solid"),
    emptyOutDir: true,
    // A chunk per component, not per item: the Worker's 20,000 static files.
    rolldownOptions: previewChunks(),
  },
  plugins: lazyPlugins(() => [
    kirana(),
    solid(),
    // The fonts from the site's own assets, not a copy per app.
    previewFonts(),
    previewPages({
      framework: "solid",
      base: "ark",
      extension: ".tsx",
      extra: ["showcase", "charts"],
    }),
  ]),
  // The code block demos' text imports `@/components/…`, which the tests' dependency scan reads.
  resolve: {
    alias: browserAliases(
      fileURLToPath(import.meta.resolve("@workspace/vite-config/browser-stub"))
    ),
  },
  // Every example the tests can load.
  optimizeDeps: browserDeps([
    "test/**/*.{ts,tsx}",
    "../../registry/bases/solid-ark/examples/*.tsx",
  ]),
  // The items in a real browser (`test/`), compiled as this app compiles them: `vp run browser`.
  test: browserTest(playwright, {
    name: "browser-solid",
    setupFiles: ["test/setup.ts"],
  }),
})
