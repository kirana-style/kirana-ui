// Single-file components, typed for the TypeScript files that import them (`index.ts`); their own
// templates are checked by each preview app's build (Vue's and Svelte's).
declare module "*.vue" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent
  export default component
}

declare module "*.svelte" {
  import type { Component } from "svelte"

  const component: Component<Record<string, unknown>>
  export default component
}
