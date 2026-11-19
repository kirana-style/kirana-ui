import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Progress as ProgressPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
  ProgressLabel as ProgressLabelPrimitive,
  ProgressTrack as ProgressTrackPrimitive,
  ProgressValue as ProgressValuePrimitive,
} from "@ui-sdk/solid/progress"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { progress } from "../../../styles/progress.styles"

/** ui-sdk's progress: `value`, as Base UI's, `null` while under way by an unknown amount. */
function Progress(props: {
  value?: number | null
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={ProgressPrimitive}
      slotName="progress"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, progress.root, props.sx)}
    >
      {props.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </UisdkPart>
  )
}

function ProgressIndicator(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={ProgressIndicatorPrimitive}
      slotName="progress-indicator"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, progress.indicator, props.sx)}
    />
  )
}

function ProgressLabel(props: {
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={ProgressLabelPrimitive}
      slotName="progress-label"
      tag="span"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, progress.label, props.sx)}
    />
  )
}

function ProgressTrack(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={ProgressTrackPrimitive}
      slotName="progress-track"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, progress.track, props.sx)}
    />
  )
}

/** ui-sdk's text (`40%`) unless the caller gives its own. */
function ProgressValue(props: {
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={ProgressValuePrimitive}
      slotName="progress-value"
      tag="span"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, progress.value, props.sx)}
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
