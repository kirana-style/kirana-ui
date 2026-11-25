/** A segmented control's size. */
export type SegmentedControlSize = "sm" | "default" | "lg"

/** What a SegmentedControl hands its items, as React's context does: a getter, so it follows. */
export type SegmentedControlContext = {
  readonly size: SegmentedControlSize
}

export const SEGMENTED_CONTROL = Symbol("segmented-control")
