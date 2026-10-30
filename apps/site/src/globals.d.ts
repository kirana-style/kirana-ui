/**
 * `registry/core/design-script.ts` bundled on its own, written inline before the first paint (the
 * `design-script` plugin, vite.config.ts).
 */
declare module "virtual:design-script" {
  const script: string
  export default script
}

/**
 * The React previews' names per variant (`react/base`, `react/aria`), read from each base's
 * `previews.ts` (the `react-preview-names` plugin, vite.config.ts).
 */
declare module "virtual:react-preview-names" {
  const names: Record<"react/base" | "react/aria", readonly string[]>
  export default names
}
