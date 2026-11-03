/**
 * `registry/core/design-script.ts` bundled on its own, written inline before the first paint (the
 * `design-script` plugin, vite.config.ts).
 */
declare module "virtual:design-script" {
  const script: string
  export default script
}

/**
 * The previews' names per framework and base (`react/base`, `vue/ark` …), read from React's
 * `previews.ts` and the other frameworks' `examples` folders (the `preview-names` plugin,
 * vite.config.ts).
 */
declare module "virtual:preview-names" {
  const names: Record<
    | "react/base"
    | "react/aria"
    | "vue/ark"
    | "svelte/ark"
    | "solid/ark"
    | "angular/ng",
    readonly string[]
  >
  export default names
}
