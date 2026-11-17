import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { trace } from "../../../styles/trace.styles"

type Span = Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }

function Trace({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="trace" {...props} sx={[trace.root, sx]} />
}

function TraceLine({
  sx,
  status,
  ...props
}: Span & { status?: "running" | "error" | "pending" }) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      {...props}
      sx={[trace.line, sx]}
    />
  )
}

function TraceIcon({ sx, ...props }: Span) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      {...props}
      sx={[trace.icon, sx]}
    />
  )
}

function TraceTitle({ sx, ...props }: Span) {
  return <span data-slot="trace-title" {...props} sx={[trace.title, sx]} />
}

function TraceDescription({ sx, ...props }: Span) {
  return (
    <span
      data-slot="trace-description"
      {...props}
      sx={[trace.description, sx]}
    />
  )
}

function TraceCollapsible({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "open" | "className"> & {
  sx?: Sx
} & (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          React.ComponentProps<typeof Collapsible>["onOpenChange"]
        >
      }
  )) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      {...props}
      {...styleProps(trace.collapsible, sx)}
    />
  )
}

function TraceCollapsibleTrigger({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTrigger>, "className"> & {
  sx?: Sx
}) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      {...props}
      {...styleProps(trace.trigger, sx)}
    >
      {children}
      <TraceIcon sx={trace.chevron}>
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
        />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceCollapsibleContent({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleContent>, "className"> & {
  sx?: Sx
}) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      {...props}
      {...styleProps(trace.content)}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        sx={[trace.contentInner, sx]}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
}
