import type { progressCircle } from "../../../../styles/progress-circle.styles"

export { default as ProgressCircle } from "./ProgressCircle.svelte"
export { default as ProgressCircleTrack } from "./ProgressCircleTrack.svelte"
export { default as ProgressCircleIndicator } from "./ProgressCircleIndicator.svelte"
export { default as ProgressCircleLabel } from "./ProgressCircleLabel.svelte"
export { progressCircle as progressCircleVariants } from "../../../../styles/progress-circle.styles"

export type ProgressCircleVariants = NonNullable<
  Parameters<typeof progressCircle>[0]
>
