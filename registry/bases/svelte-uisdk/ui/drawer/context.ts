import { getContext, setContext } from "svelte"

export type SwipeDirection = "up" | "down" | "left" | "right"
/** A snap point: a fraction of the viewport, or a length. */
export type SnapPoint = number | string

/** What a Drawer hands its content, as React's context does. */
export type DrawerContext = {
  readonly hasSnapPoints: boolean
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
  /** The content's own element, whose scroll-driven animations end as the drawer closes. */
  content: HTMLElement | null
}

const KEY = Symbol("drawer")
export const setDrawer = (context: DrawerContext) => setContext(KEY, context)
export const useDrawer = () => getContext<DrawerContext>(KEY)
