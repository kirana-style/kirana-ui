import { StatusIcon } from "./status-icon"
import { splitProps } from "solid-js"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { Status } from "./types"

/** A step: a line, or a collapsible line when it has `content` to show. */
export function Step(props: {
  title: string
  status?: Status
  defaultOpen?: boolean
  content: boolean
  children?: JSX.Element
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "title",
    "status",
    "defaultOpen",
    "content",
    "children",
    "sx",
    "class",
  ])

  return (
    <>
      {local.content ? (
        <TraceCollapsible defaultOpen={local.defaultOpen}>
          <TraceCollapsibleTrigger>
            <TraceLine status={local.status}>
              <TraceIcon>
                <StatusIcon status={local.status} />
              </TraceIcon>
              <TraceTitle>{local.title}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>{local.children}</TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine status={local.status}>
          <TraceIcon>
            <StatusIcon status={local.status} />
          </TraceIcon>
          <TraceTitle>{local.title}</TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
