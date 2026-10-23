/// <reference types="vite/client" />
/// <reference types="@kirana-style/core/vue" />

// Single-file components, typed for the TypeScript files that import them; their templates are
// compiled, not type-checked (TypeScript 7 has no JavaScript API for `vue-tsc`).
declare module "*.vue" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent
  export default component
}
