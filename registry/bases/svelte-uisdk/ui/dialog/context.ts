import { getContext, setContext } from "svelte"

/** The open dialog's content, whose scroll-driven animations end as it closes (LF-024). */
export type ContentHolder = { el: HTMLElement | null }

const KEY = Symbol("dialog-content")
export const setContent = (holder: ContentHolder) => setContext(KEY, holder)
export const useContent = () => getContext<ContentHolder | undefined>(KEY)
