import type { InjectionKey } from "vue"

export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does. */
export type DrawerContext = {
  hasSnapPoints: boolean
  modal: boolean
  showSwipeHandle: boolean
  swipeDirection: SwipeDirection
  /** The content's own element, whose scroll-driven animations end as the drawer closes. */
  content: HTMLElement | null
}

export const DRAWER: InjectionKey<DrawerContext> = Symbol("drawer")
