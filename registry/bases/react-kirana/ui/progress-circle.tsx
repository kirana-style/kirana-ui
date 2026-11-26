"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { Progress as ProgressPrimitive } from "@kirana-ui/react/progress"

import type { Sx } from "../../../lib/sx"
import {
  progressCircle,
  progressCircleParts,
} from "../../../styles/progress-circle.styles"

type ProgressCircleVariants = NonNullable<Parameters<typeof progressCircle>[0]>

/** The whole range: a ring in the progress track's colour. */
function ProgressCircleTrack({
  sx,
  ...props
}: Omit<React.ComponentProps<"circle">, "className"> & { sx?: Sx }) {
  return (
    <circle
      data-slot="progress-circle-track"
      pathLength={100}
      {...props}
      sx={[progressCircleParts.track, sx]}
    />
  )
}

/** The filled part: an arc as long as the value's share of the range. */
function ProgressCircleIndicator({
  sx,
  ...props
}: Omit<React.ComponentProps<"circle">, "className"> & { sx?: Sx }) {
  return (
    <circle
      data-slot="progress-circle-indicator"
      pathLength={100}
      {...props}
      sx={[progressCircleParts.indicator, sx]}
    />
  )
}

/** The value, written (a percentage of the range by default), for the middle of the ring. */
function ProgressCircleLabel({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Value>, "className"> & {
  sx?: Sx
}) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-circle-label"
      {...props}
      {...styleProps(progressCircleParts.label, sx)}
    />
  )
}

/** A progress ring: draws its track and its arc, and `children` in the middle. */
function ProgressCircle({
  sx,
  size = "default",
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ProgressPrimitive.Root>,
  "className" | "style"
> &
  ProgressCircleVariants & { sx?: Sx }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-circle"
      data-size={size}
      {...props}
      {...styleProps(progressCircleParts.scope, progressCircle({ size }), sx)}
    >
      <svg
        data-slot="progress-circle-svg"
        aria-hidden="true"
        sx={progressCircleParts.svg}
      >
        <ProgressCircleTrack />
        <ProgressCircleIndicator />
      </svg>
      {children}
    </ProgressPrimitive.Root>
  )
}

export {
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleIndicator,
  ProgressCircleLabel,
  progressCircle as progressCircleVariants,
}
export type { ProgressCircleVariants }
