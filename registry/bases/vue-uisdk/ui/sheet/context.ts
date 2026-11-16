import type { InjectionKey } from "vue"

/** The open sheet's content, whose scroll-driven animations end as it closes (LF-024). */
export const CONTENT: InjectionKey<{ el: HTMLElement | null }> =
  Symbol("sheet-content")
