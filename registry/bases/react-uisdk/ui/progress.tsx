"use client"

import type { ComponentProps, ReactNode } from "react"

import * as ProgressPrimitive from "@ui-sdk/react/progress"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"
import { progress } from "../../../styles/progress.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Progress({
  sx,
  children,
  value,
  ...props
}: Props<
  Omit<ComponentProps<typeof ProgressPrimitive.Progress>, "children"> & {
    // Plain content, as Base UI's root takes it: the track follows it.
    children?: ReactNode
  }
>) {
  return (
    <ProgressPrimitive.Progress
      value={value}
      {...props}
      render={slotRender(slotOf(props, "progress"), "div", props.render)}
      {...styleProps(progress.root, sx)}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Progress>
  )
}

function ProgressTrack({
  sx,
  ...props
}: Props<ComponentProps<typeof ProgressPrimitive.ProgressTrack>>) {
  return (
    <ProgressPrimitive.ProgressTrack
      {...props}
      render={slotRender(slotOf(props, "progress-track"), "div", props.render)}
      {...styleProps(progress.track, sx)}
    />
  )
}

function ProgressIndicator({
  sx,
  ...props
}: Props<ComponentProps<typeof ProgressPrimitive.ProgressIndicator>>) {
  return (
    <ProgressPrimitive.ProgressIndicator
      {...props}
      render={slotRender(
        slotOf(props, "progress-indicator"),
        "div",
        props.render
      )}
      {...styleProps(progress.indicator, sx)}
    />
  )
}

function ProgressLabel({
  sx,
  ...props
}: Props<ComponentProps<typeof ProgressPrimitive.ProgressLabel>>) {
  return (
    <ProgressPrimitive.ProgressLabel
      {...props}
      render={slotRender(slotOf(props, "progress-label"), "span", props.render)}
      {...styleProps(progress.label, sx)}
    />
  )
}

/** Base UI's function child, `(formattedValue, value)`, as ui-sdk's of the part's state. */
function ProgressValue({
  sx,
  children,
  ...props
}: Omit<
  Props<ComponentProps<typeof ProgressPrimitive.ProgressValue>>,
  "children"
> & {
  children?:
    | ReactNode
    | ((formattedValue: string | null, value: number | null) => ReactNode)
}) {
  return (
    <ProgressPrimitive.ProgressValue
      {...props}
      render={slotRender(slotOf(props, "progress-value"), "span", props.render)}
      {...styleProps(progress.value, sx)}
    >
      {typeof children === "function"
        ? (state) => children(state.text || null, state.value)
        : children}
    </ProgressPrimitive.ProgressValue>
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
