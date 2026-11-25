import type { InjectionKey, Ref } from "vue"

/** A segmented control's size. */
export type SegmentedControlSize = "sm" | "default" | "lg"

/** What a SegmentedControl hands its items, as React's context does: its size. */
export const SEGMENTED_CONTROL: InjectionKey<Ref<SegmentedControlSize>> =
  Symbol("segmented-control")
