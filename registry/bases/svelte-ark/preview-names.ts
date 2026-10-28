/**
 * The names `/preview/svelte/ark/<item>` answers to, in a module of its own: the React site lists
 * them (`/create`'s explorer) without importing a `.svelte` file. `previews.ts` maps each to its
 * component, and its type keeps the two lists the same.
 */
export const PREVIEW_NAMES = ["button-demo", "skeleton-demo"] as const
