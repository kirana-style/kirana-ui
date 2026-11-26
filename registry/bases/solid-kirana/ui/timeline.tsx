import { omit, Show } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { timeline } from "../../../styles/timeline.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import { withDefaults } from "../../../lib/solid2/with-defaults"

type TimelineMarkerVariants = NonNullable<Parameters<typeof timeline.marker>[0]>

function Timeline(props: {
  orientation?: "vertical" | "horizontal"
  align?: "start" | "alternate"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults(
    { orientation: "vertical", align: "start" } as const,
    props
  )
  const rest = omit(local, "orientation", "align", "class", "sx", "children")
  return (
    <ol
      data-slot="timeline"
      data-orientation={local.orientation}
      data-align={local.align}
      {...rest}
      {...styleProps(local.class, timeline.root, local.sx)}
    >
      {local.children}
    </ol>
  )
}

/** An event: its marker and content, then the line to the next event, which the last one hides. */
function TimelineItem(props: {
  connector?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "connector", "class", "sx", "children")
  return (
    <li
      data-slot="timeline-item"
      {...rest}
      {...styleProps(props.class, timeline.item, props.sx)}
    >
      {props.children}
      <Show when={props.connector ?? true}>
        <TimelineConnector />
      </Show>
    </li>
  )
}

function TimelineMarker(props: {
  variant?: TimelineMarkerVariants["variant"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = withDefaults({ variant: "default" } as const, props)
  const rest = omit(local, "variant", "class", "sx", "children")
  return (
    <span
      data-slot="timeline-marker"
      data-variant={local.variant}
      aria-hidden="true"
      {...rest}
      {...styleProps(
        local.class,
        timeline.marker({ variant: local.variant }),
        local.sx
      )}
    >
      {local.children}
    </span>
  )
}

function TimelineConnector(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="timeline-connector"
      aria-hidden="true"
      {...rest}
      {...styleProps(props.class, timeline.connector, props.sx)}
    >
      {props.children}
    </div>
  )
}

function TimelineContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="timeline-content"
      {...rest}
      {...styleProps(props.class, timeline.content, props.sx)}
    >
      {props.children}
    </div>
  )
}

function TimelineTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="timeline-title"
      {...rest}
      {...styleProps(props.class, timeline.title, props.sx)}
    >
      {props.children}
    </div>
  )
}

function TimelineDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <p
      data-slot="timeline-description"
      {...rest}
      {...styleProps(props.class, timeline.description, props.sx)}
    >
      {props.children}
    </p>
  )
}

function TimelineTime(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <time
      data-slot="timeline-time"
      {...rest}
      {...styleProps(props.class, timeline.time, props.sx)}
    >
      {props.children}
    </time>
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
}
