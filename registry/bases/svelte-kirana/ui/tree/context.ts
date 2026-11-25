import { getContext, setContext } from "svelte"

/** Whether the item a row belongs to is a branch: its row draws a chevron, a leaf's the room for one. */
const KEY = Symbol("tree-branch")

export const setTreeBranch = (branch: () => boolean) => setContext(KEY, branch)
export const useTreeBranch = () =>
  getContext<(() => boolean) | undefined>(KEY) ?? (() => false)
