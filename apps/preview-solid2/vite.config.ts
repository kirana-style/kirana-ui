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
import solid from "@solidjs/vite-plugin"
import { defineConfig, lazyPlugins } from "vite-plus"
import { playwright } from "vite-plus/test/browser-playwright"

/**
 * Solid on ui-sdk, on Solid 2: the registry's `solid-uisdk` items on their own page, compiled by
 * Kirana's adapter (Solid's, detected from `jsxImportSource: "@solidjs/web"`) and then Solid 2's plugin
 * (`@solidjs/vite-plugin`). Solid 1's apps stay on Solid 1 (`apps/preview-solid`):
 * Solid 2 and the packages on it resolve from this app, for the registry's files too
 * (`resolve.dedupe`). Built into the `ui` Worker's static files at `/preview/solid2/`, which the
 * site's `_redirects` serves at `/preview/solid/uisdk/<item>`.
 */
export default defineConfig({
  base: "/preview/solid2/",
  build: {
    outDir: previewOutDir("solid2"),
    emptyOutDir: true,
    rolldownOptions: previewChunks(),
  },
  plugins: lazyPlugins(() => [
    kirana(),
    solid(),
    // The fonts from the site's own assets, not a copy per app.
    previewFonts(),
    previewPages({
      framework: "solid",
      base: "uisdk",
      extension: ".tsx",
      app: "solid2",
    }),
  ]),
  resolve: {
    // The table's core and dnd-kit's framework-free packages too, which the registry's Solid 2
    // files use for want of Solid 2 adapters (LF-032).
    dedupe: [
      "solid-js",
      "@solidjs/web",
      "@ui-sdk/solid",
      "@ui-sdk/core",
      "@tanstack/table-core",
      "@dnd-kit/dom",
      "@dnd-kit/abstract",
      // Sonner's Solid 2 release (1.0), where the root holds Solid 1's (0.3) for the Ark UI base.
      "solid-sonner",
    ],
    alias: browserAliases(
      fileURLToPath(import.meta.resolve("@workspace/vite-config/browser-stub"))
    ),
  },
  optimizeDeps: browserDeps([
    "test/**/*.{ts,tsx}",
    "../../registry/bases/solid-uisdk/examples/*.tsx",
  ]),
  test: browserTest(playwright, {
    name: "browser-solid2",
    setupFiles: ["test/setup.ts"],
  }),
})
