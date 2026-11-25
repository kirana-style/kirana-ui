import type { InjectionKey } from "vue"

/** Whether the item a row belongs to is a branch: its row draws a chevron, a leaf's the room for one. */
export const TREE_BRANCH: InjectionKey<() => boolean> = Symbol("TreeBranch")
