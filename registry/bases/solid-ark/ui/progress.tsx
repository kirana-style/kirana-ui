import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  ProgressLabel as ArkProgressLabel,
  ProgressRange,
  ProgressRoot,
  ProgressTrack as ArkProgressTrack,
  ProgressValueText,
} from "@ark-ui/solid"
import { progress } from "../../../styles/progress.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  ProgressLabelProps,
  ProgressRangeProps,
  ProgressRootProps,
  ProgressTrackProps,
  ProgressValueTextProps,
} from "@ark-ui/solid"

function Progress(props: {
  value?: number | null
  asChild?: ProgressRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // `value`, as Base UI's: Ark's `model-value`, for a progress its caller moves.
  return (
    <ProgressRoot
      asChild={local.asChild}
      data-slot="progress"
      value={local.value}
      {...rest}
      {...styleProps(local.class, progress.root, local.sx)}
    >
      {local.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  )
}

function ProgressIndicator(props: {
  asChild?: ProgressRangeProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ProgressRange
      asChild={local.asChild}
      data-slot="progress-indicator"
      {...rest}
      {...styleProps(local.class, progress.indicator, local.sx)}
    >
      {local.children}
    </ProgressRange>
  )
}

function ProgressLabel(props: {
  asChild?: ProgressLabelProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ArkProgressLabel
      asChild={local.asChild}
      data-slot="progress-label"
      {...rest}
      {...styleProps(local.class, progress.label, local.sx)}
    >
      {local.children}
    </ArkProgressLabel>
  )
}

function ProgressTrack(props: {
  asChild?: ProgressTrackProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ArkProgressTrack
      asChild={local.asChild}
      data-slot="progress-track"
      {...rest}
      {...styleProps(local.class, progress.track, local.sx)}
    >
      {local.children}
    </ArkProgressTrack>
  )
}

function ProgressValue(props: {
  asChild?: ProgressValueTextProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ProgressValueText
      asChild={local.asChild}
      children={local.children}
      data-slot="progress-value"
      {...rest}
      {...styleProps(local.class, progress.value, local.sx)}
    />
  )
}

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
