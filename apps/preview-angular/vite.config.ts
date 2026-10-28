import { createRequire, registerHooks } from "node:module"
import { pathToFileURL } from "node:url"

import { kiranaAngular } from "@kirana-style/angular/vite"
import { previewOutDir, previewPages } from "@workspace/vite-config/preview"
import { defineConfig } from "vite-plus"

/**
 * Analog's plugin imports `typescript` without declaring it, so Bun's isolated install hands it the
 * workspace's TypeScript 7, which has no JavaScript API; Angular's compiler needs 6. This build's
 * `typescript` is this app's own (6), for every importer, before Analog loads.
 */
const typescript = pathToFileURL(
  createRequire(import.meta.url).resolve("typescript")
).href
registerHooks({
  resolve: (specifier, context, next) =>
    specifier === "typescript"
      ? { url: typescript, format: "commonjs", shortCircuit: true }
      : next(specifier, context),
})
const { default: angular } = await import("@analogjs/vite-plugin-angular")

/**
 * The Angular preview: the registry's `angular-ng` items on their own page. Analog's plugin
 * compiles Angular from its own program on disk (`tsconfig.app.json`, which takes the registry's
 * Angular files in), and Kirana's runs after it on what Angular emitted (`kiranaAngular`). Built
 * into the `ui` Worker's static files with a page per item and the showcase
 * (`@workspace/vite-config/preview`). The build script runs Angular's compiler first (`ngc
 * --noEmit`): on a type error Analog leaves the file to Angular's runtime compiler, which a
 * production bundle lacks, so the page would fail in the browser with the build passing.
 */
export default defineConfig({
  base: "/preview/angular/",
  build: {
    outDir: previewOutDir("angular"),
    emptyOutDir: true,
    target: ["es2022"],
  },
  resolve: { mainFields: ["module"] },
  plugins: [
    angular({ tsconfig: "tsconfig.app.json" }),
    kiranaAngular(),
    previewPages({
      framework: "angular",
      base: "ng",
      extension: ".ts",
      extra: ["showcase"],
    }),
  ],
})
