import type * as React from "react"

import type { Sx } from "../../../lib/sx"
import { timeline } from "../../../styles/timeline.styles"

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }
type TimelineMarkerVariants = NonNullable<Parameters<typeof timeline.marker>[0]>

function Timeline({
  sx,
  orientation = "vertical",
  align = "start",
  ...props
}: El<"ol"> & {
  orientation?: "vertical" | "horizontal"
  align?: "start" | "alternate"
}) {
  return (
    <ol
      data-slot="timeline"
      data-orientation={orientation}
      data-align={align}
      {...props}
      sx={[timeline.root, sx]}
    />
  )
}

function TimelineItem({
  sx,
  connector = true,
  children,
  ...props
}: El<"li"> & { connector?: boolean }) {
  return (
    <li data-slot="timeline-item" {...props} sx={[timeline.item, sx]}>
      {children}
      {connector && <TimelineConnector />}
    </li>
  )
}

function TimelineMarker({
  sx,
  variant = "default",
  ...props
}: El<"span"> & TimelineMarkerVariants) {
  return (
    <span
      data-slot="timeline-marker"
      data-variant={variant}
      aria-hidden="true"
      {...props}
      sx={[timeline.marker({ variant }), sx]}
    />
  )
}

function TimelineConnector({ sx, ...props }: El) {
  return (
    <div
      data-slot="timeline-connector"
      aria-hidden="true"
      {...props}
      sx={[timeline.connector, sx]}
    />
  )
}

function TimelineContent({ sx, ...props }: El) {
  return (
    <div data-slot="timeline-content" {...props} sx={[timeline.content, sx]} />
  )
}

function TimelineTitle({ sx, ...props }: El) {
  return <div data-slot="timeline-title" {...props} sx={[timeline.title, sx]} />
}

function TimelineDescription({ sx, ...props }: El<"p">) {
  return (
    <p
      data-slot="timeline-description"
      {...props}
      sx={[timeline.description, sx]}
    />
  )
}

function TimelineTime({ sx, ...props }: El<"time">) {
  return <time data-slot="timeline-time" {...props} sx={[timeline.time, sx]} />
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
