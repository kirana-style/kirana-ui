import kirana from "@kirana-style/vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { previewOutDir } from "@workspace/vite-config/preview"
import { defineConfig, lazyPlugins } from "vite-plus"

/**
 * The primitives' previews: each `@kirana-ui/react` component drawn raw, and styled three ways
 * from one piece of markup (CSS Modules, Tailwind, Kirana), on one page the docs frame
 * (`/preview/primitives/?demo=dialog&style=tailwind`). A style's stylesheet loads only with that
 * style, so the raw one is the browser's own. Built into the `ui` Worker's static files.
 */
export default defineConfig({
  base: "/preview/primitives/",
  build: { outDir: previewOutDir("primitives"), emptyOutDir: true },
  plugins: lazyPlugins(() => [kirana(), react(), tailwindcss()]),
})
