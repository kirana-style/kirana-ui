import { defineConfig } from "@kirana-style/core/config"
import { registryConfig } from "@workspace/registry/core/kirana.ts"
import { uiConfig } from "@workspace/ui/kirana.ts"

export default defineConfig({
  // The demo's components and the registry's, on the site's pages and previews: both sets of states that never meet, and the
  // registry's one vocabulary per base.
  conditions: {
    exclusive: [
      ...uiConfig.conditions.exclusive,
      ...registryConfig.conditions.exclusive,
    ],
    exclusiveAcross: registryConfig.conditions.exclusiveAcross,
  },
  // The hand-written reset and element styles in @workspace/ui/globals.css, and the registry's
  // reset on preview pages, and `typeset.css` (the typeset builder and its previews), sit below
  // every Kirana rule, in development and production alike.
  layers: { before: ["reset", "base", "typeset"] },
})
