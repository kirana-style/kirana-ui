/**
 * The names `/preview/angular/ng/<item>` answers to, in a module of its own: the React site lists
 * them (`/create`'s explorer) without importing Angular. `previews.ts` maps each to its component,
 * and its type keeps the two lists the same.
 */
export const PREVIEW_NAMES = ["button-demo", "skeleton-demo"] as const
