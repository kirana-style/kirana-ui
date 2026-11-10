import type { InjectionKey, Ref } from "vue"

/** True while the reply's last code fence has not closed yet (Streamdown's `useIsCodeFenceIncomplete`). */
export const FENCE_OPEN: InjectionKey<Ref<boolean>> = Symbol("fence-open")
