import { children as resolve, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Progress as ProgressPrimitive } from "@kirana-ui/solid/progress"
import { asRender } from "../../../lib/solid2/element"
import { progress } from "../../../styles/progress.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

function Progress(props: {
  value?: number | null
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "value", "asChild", "class", "sx", "children")
  // `value`, as Base UI's, for a progress its caller moves: none is "under way, how far unknown".
  return (
    <ProgressPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="progress"
      value={local.value ?? null}
      {...rest}
      {...styleProps(local.class, progress.root, local.sx)}
    >
      {local.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressIndicator(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <ProgressPrimitive.Indicator
      render={asRender(local.asChild)}
      data-slot="progress-indicator"
      {...rest}
      {...styleProps(local.class, progress.indicator, local.sx)}
    >
      {local.children}
    </ProgressPrimitive.Indicator>
  )
}

function ProgressLabel(props: {
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <ProgressPrimitive.Label
      render={asRender(local.asChild)}
      data-slot="progress-label"
      {...rest}
      {...styleProps(local.class, progress.label, local.sx)}
    >
      {local.children}
    </ProgressPrimitive.Label>
  )
}

function ProgressTrack(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <ProgressPrimitive.Track
      render={asRender(local.asChild)}
      data-slot="progress-track"
      {...rest}
      {...styleProps(local.class, progress.track, local.sx)}
    >
      {local.children}
    </ProgressPrimitive.Track>
  )
}

/**
 * The value, written as a percentage of the range unless children are given, as Ark UI's: Kirana
 * UI's value part takes a function for other content, which is handed the children.
 */
function ProgressValue(props: {
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx", "children")
  const content = resolve(() => local.children)
  return (
    <ProgressPrimitive.Value
      render={asRender(local.asChild)}
      data-slot="progress-value"
      {...rest}
      {...styleProps(local.class, progress.value, local.sx)}
    >
      {content.toArray().length > 0 ? () => content() : undefined}
    </ProgressPrimitive.Value>
  )
}

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
