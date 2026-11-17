import kirana from "@kirana-style/vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { previewOutDir } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"
import type { Plugin } from "vite-plus"

/**
 * The primitives' previews: each `@kirana-ui/react` component drawn raw, and styled three ways
 * from one piece of markup (CSS Modules, Tailwind, Kirana), on one page the docs frame
 * (`/preview/primitives/?demo=dialog&style=tailwind`). A style's stylesheet loads only with that
 * style, so the raw one is the browser's own. Built into the `ui` Worker's static files.
 */
/**
 * Names each part on its element (`data-part="Dialog.Trigger"`), from the demo's own markup: the
 * anatomy view draws its lines to them, and a reader's inspector shows which element is which.
 */
function partNames(): Plugin {
  return {
    name: "demo-part-names",
    enforce: "pre",
    transform(code, id) {
      // The file itself, not a view of it: `?raw` is its text, which the anatomy view reads.
      if (id.includes("?") || !/\/src\/demos\/[^/]+\/demo\.tsx$/.test(id))
        return undefined
      return code.replace(
        // A JSX tag, not a type's `<`: nothing that names a value comes before it.
        /(?<![\w)\]])<([A-Z][A-Za-z]*(?:\.[A-Z][A-Za-z]*)?)(?=[\s/>])/g,
        (whole, tag: string) =>
          tag === "Fragment" ? whole : `${whole} data-part="${tag}"`
      )
    },
  }
}

export default defineConfig({
  base: "/preview/primitives/",
  build: { outDir: previewOutDir("primitives"), emptyOutDir: true },
  plugins: lazyPlugins(() => [partNames(), kirana(), react(), tailwindcss()]),
})
