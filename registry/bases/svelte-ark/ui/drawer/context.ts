export type SwipeDirection = "up" | "down" | "left" | "right"

/** What a Drawer hands its content, as React's context does: getters, so they follow it. */
export type DrawerContext = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
}

export const DRAWER = Symbol("drawer")
