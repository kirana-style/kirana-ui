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

/** The value's share of the range, from 0 to 1, or `undefined` while it is not known. */
function shareOf(value: number | null, min = 0, max = 100) {
  if (value === null || max <= min) return undefined
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

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
  value,
  min,
  max,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ProgressPrimitive.Root>,
  "className" | "style"
> &
  ProgressCircleVariants & { sx?: Sx }) {
  const share = shareOf(value, min, max)
  const own = styleProps(
    progressCircleParts.scope,
    progressCircle({ size }),
    sx
  )

  return (
    <ProgressPrimitive.Root
      value={value}
      min={min}
      max={max}
      data-slot="progress-circle"
      data-size={size}
      {...props}
      className={own.className}
      // The value's share of the range, which the arc is drawn from.
      style={
        share === undefined
          ? own.style
          : ({
              "--progress-circle-value": share,
              ...own.style,
            } as React.CSSProperties)
      }
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
