export type SwipeDirection = "up" | "down" | "left" | "right"

/** A snap point: a share of the viewport (`0.5`, `1`) or a length (`"31rem"`, `"148px"`). */
export type SnapPoint = number | string

/** What a Drawer hands its parts, as React's context does: getters, so they follow it. */
export type DrawerOptions = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
}

export const DRAWER = Symbol("drawer")
