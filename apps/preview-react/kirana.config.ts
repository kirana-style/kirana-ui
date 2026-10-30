import { defineConfig } from "@kirana-style/core/config"
import { registryConfig } from "@workspace/registry/core/kirana.ts"

export default defineConfig({
  ...registryConfig,
  // The registry's reset sits below every Kirana rule.
  layers: { before: ["reset"] },
})
