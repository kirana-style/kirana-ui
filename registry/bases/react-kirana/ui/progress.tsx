"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { Progress as ProgressPrimitive } from "@kirana-ui/react/progress"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { progress } from "../../../styles/progress.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Progress({
  sx,
  children,
  value,
  ...props
}: Props<PartProps<typeof ProgressPrimitive.Root>>) {
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

function ProgressTrack({
  sx,
  ...props
}: Props<PartProps<typeof ProgressPrimitive.Track>>) {
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
}: Props<PartProps<typeof ProgressPrimitive.Indicator>>) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      {...props}
      {...styleProps(progress.indicator, sx)}
    />
  )
}

function ProgressLabel({
  sx,
  ...props
}: Props<PartProps<typeof ProgressPrimitive.Label>>) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      {...props}
      {...styleProps(progress.label, sx)}
    />
  )
}

function ProgressValue({
  sx,
  ...props
}: Props<PartProps<typeof ProgressPrimitive.Value>>) {
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
