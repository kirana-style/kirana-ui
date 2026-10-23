import { defineConfig } from "@kirana-style/core/config"
import { registryConfig } from "@workspace/registry/core/kirana.ts"
import { uiConfig } from "@workspace/ui/kirana.ts"

export default defineConfig({
  // The demo's components and the registry's previews: both sets of states that never meet.
  conditions: {
    exclusive: [
      ...uiConfig.conditions.exclusive,
      ...registryConfig.conditions.exclusive,
    ],
  },
  // The hand-written reset and element styles in @workspace/ui/globals.css, and the registry's
  // reset on preview pages, sit below every Kirana rule, in development and production alike.
  layers: { before: ["reset", "base"] },
})
