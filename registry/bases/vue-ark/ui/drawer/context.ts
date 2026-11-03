import type { InjectionKey } from "vue"

export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does. */
export type DrawerContext = {
  hasSnapPoints: boolean
  modal: boolean
  showSwipeHandle: boolean
  swipeDirection: SwipeDirection
}

export const DRAWER: InjectionKey<DrawerContext> = Symbol("drawer")
