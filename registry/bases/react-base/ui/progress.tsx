"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { progress } from "../../../styles/progress.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Progress({
  sx,
  children,
  value,
  ...props
}: Props<ProgressPrimitive.Root.Props>) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      {...props}
      {...styleProps(progress.root, sx)}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ sx, ...props }: Props<ProgressPrimitive.Track.Props>) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      {...props}
      {...styleProps(progress.track, sx)}
    />
  )
}

function ProgressIndicator({
  sx,
  ...props
}: Props<ProgressPrimitive.Indicator.Props>) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      {...props}
      {...styleProps(progress.indicator, sx)}
    />
  )
}

function ProgressLabel({ sx, ...props }: Props<ProgressPrimitive.Label.Props>) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      {...props}
      {...styleProps(progress.label, sx)}
    />
  )
}

function ProgressValue({ sx, ...props }: Props<ProgressPrimitive.Value.Props>) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      {...props}
      {...styleProps(progress.value, sx)}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
