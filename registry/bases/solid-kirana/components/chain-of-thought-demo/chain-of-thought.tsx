import { StatusIcon } from "./status-icon"
import { StepRow } from "./step-row"
import { For, createMemo, createSignal, splitProps } from "solid-js"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"
import type { Status, StepPart } from "./types"

export function ChainOfThought(props: {
  steps: StepPart[]
  streaming: boolean
  answering: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "steps",
    "streaming",
    "answering",
    "sx",
    "class",
  ])
  const [open, setOpen] = createSignal<boolean>()
  const running = createMemo(() => local.streaming && !local.answering)
  const failed = createMemo(
    () => local.steps.filter((part) => part.state === "output-error").length
  )
  const status = createMemo<Status>(() =>
    running() ? "running" : failed() > 0 ? "error" : undefined
  )

  return (
    <Trace>
      <TraceCollapsible
        open={open() ?? running()}
        onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
      >
        <TraceCollapsibleTrigger>
          <TraceLine status={status()}>
            <TraceIcon>
              <StatusIcon status={status()} />
            </TraceIcon>
            <TraceTitle>
              {running()
                ? "Researching"
                : `Researched in ${local.steps.length} steps${failed() > 0 ? `, ${failed()} failed()` : ""}`}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent keepMounted>
          <Trace>
            <For each={local.steps}>
              {(part) => <StepRow part={part} streaming={local.streaming} />}
            </For>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
