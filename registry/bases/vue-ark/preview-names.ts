/**
 * The names `/preview/vue/ark/<item>` answers to, in a module of its own: the React site lists
 * them (`/create`'s explorer) without importing a `.vue` file. `previews.ts` maps each to its
 * component, and its type keeps the two lists the same.
 */
export const PREVIEW_NAMES = [
  "button-demo",
  "dialog-demo",
  "dropdown-menu-demo",
  "select-demo",
  "skeleton-demo",
  "tabs-demo",
] as const
