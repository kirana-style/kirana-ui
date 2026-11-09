/** True while the reply's last code fence has not closed yet (Streamdown's `useIsCodeFenceIncomplete`). */
export const FENCE_OPEN = Symbol("fence-open")
export type FenceOpenContext = { readonly value: boolean }
