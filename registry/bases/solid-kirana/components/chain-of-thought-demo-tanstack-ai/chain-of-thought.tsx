import { StatusIcon } from "./status-icon"
import { StepRow } from "./step-row"
import { Index, createMemo, createSignal, splitProps } from "solid-js"
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
import type { Status, StepPart, ToolResultPart } from "./types"

export function ChainOfThought(props: {
  steps: StepPart[]
  results: ToolResultPart[]
  streaming: boolean
  answering: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "steps",
    "results",
    "streaming",
    "answering",
    "sx",
    "class",
  ])
  const [open, setOpen] = createSignal<boolean>()
  const running = createMemo(() => local.streaming && !local.answering)
  const failed = createMemo(
    () => local.steps.filter((part) => part.state === "error").length
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
            <Index each={local.steps}>
              {(part) => (
                <StepRow
                  part={part()}
                  result={local.results.find(
                    (result) => result.toolCallId === part().id
                  )}
                  streaming={local.streaming}
                />
              )}
            </Index>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
