import type { InjectionKey, Ref } from "vue"

/** The element the open panel is shown in, which each content teleports into. */
export const VIEWPORT: InjectionKey<Ref<HTMLElement | undefined>> = Symbol(
  "navigation-menu-viewport"
)
