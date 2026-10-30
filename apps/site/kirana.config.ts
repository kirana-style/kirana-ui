import { defineConfig } from "@kirana-style/core/config"
import { registryConfig } from "@workspace/registry/core/kirana.ts"

export default defineConfig({
  // The registry's components on the site's pages and previews: its states that never meet, and
  // its one vocabulary per base.
  conditions: registryConfig.conditions,
  // The registry's reset, the docs' code colours (`base`, docs-core's `highlight.css`) and
  // `typeset.css` (the typeset builder and its previews) sit below every Kirana rule, in
  // development and production alike.
  layers: { before: ["reset", "base", "typeset"] },
})
