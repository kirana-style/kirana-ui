import type { progressCircle } from "../../../../styles/progress-circle.styles"

export { default as ProgressCircle } from "./ProgressCircle.vue"
export { default as ProgressCircleTrack } from "./ProgressCircleTrack.vue"
export { default as ProgressCircleIndicator } from "./ProgressCircleIndicator.vue"
export { default as ProgressCircleLabel } from "./ProgressCircleLabel.vue"
export { progressCircle as progressCircleVariants } from "../../../../styles/progress-circle.styles"
export type ProgressCircleVariants = NonNullable<
  Parameters<typeof progressCircle>[0]
>
