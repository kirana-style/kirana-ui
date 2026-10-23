// Single-file components, typed for the TypeScript files that import them (`index.ts`); their own
// templates are checked by the Vue preview app's build.
declare module "*.vue" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent
  export default component
}
