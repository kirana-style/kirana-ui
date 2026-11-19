import { defineConfig } from "@kirana-style/core/config"
import { registryConfig } from "@workspace/registry/core/kirana.ts"

export default defineConfig({
  ...registryConfig,
  // Solid 2's JSX comes from `@solidjs/web`, which Kirana does not detect as Solid's (KF-127): `sx`
  // compiles to `class` because this says so.
  jsx: "solid",
  // The registry's reset sits below every Kirana rule.
  layers: { before: ["reset"] },
})
