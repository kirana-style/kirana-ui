export type SwipeDirection = "up" | "down" | "left" | "right"
/** A snap point: a share of the viewport (`0.5`, `1`) or a length (`"31rem"`, `"148px"`). */
export type SnapPoint = number | string

/** What a Drawer hands its parts, as React's context does: getters, so they follow it. */
export type DrawerOptions = {
  readonly snapPoints: readonly SnapPoint[] | undefined
  readonly modal: boolean
  readonly showSwipeHandle: boolean
  readonly swipeDirection: SwipeDirection
  readonly disablePointerDismissal: boolean
  readonly open: boolean
  setOpen: (open: boolean) => void
}

/**
 * One drawer's state, which its parts read, and the drawer it is nested in. Bits UI has no
 * drawer: the parts are its Dialog, and the swipe, the snap points and the nested drawers are
 * written here, as Base UI's drawer hands them to its styles.
 */
export class DrawerState {
  /** The snap point it rests at: the first, until a swipe moves it. */
  snap = $state(0)
  /** Drawers open inside this one. */
  nested = $state(0)

  constructor(
    readonly options: DrawerOptions,
    readonly parent: DrawerState | undefined
  ) {}

  get hasSnapPoints() {
    return (this.options.snapPoints?.length ?? 0) > 0
  }
}

export const DRAWER = Symbol("drawer")

/** A snap point's height, in pixels. */
export const toPixels = (point: SnapPoint) => {
  if (typeof point === "number")
    return point <= 1 ? point * window.innerHeight : point
  const value = parseFloat(point)
  if (point.endsWith("rem"))
    return (
      value * parseFloat(getComputedStyle(document.documentElement).fontSize)
    )
  return value
}
