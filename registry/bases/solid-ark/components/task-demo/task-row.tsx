import { StatusIcon } from "./status-icon"
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
import type { Status, TaskPart } from "./types"

export function TaskRow(props: {
  task: TaskPart["data"]
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["task", "streaming", "sx", "class"])
  function getStepStatus(
    status: TaskPart["data"]["steps"][number]["status"],
    streaming: boolean
  ): Status {
    if (status === "done") {
      return undefined
    }

    return status === "running" && streaming ? "running" : "error"
  }

  const [open, setOpen] = createSignal<boolean>()
  const steps = createMemo(() =>
    local.task.steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, local.streaming),
    }))
  )
  const status = createMemo<Status>(() =>
    steps().some((step) => step.status === "error")
      ? "error"
      : steps().some((step) => step.status === "running")
        ? "running"
        : undefined
  )

  return (
    <TraceCollapsible
      open={open() ?? status() === "running"}
      onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
    >
      <TraceCollapsibleTrigger>
        <TraceLine status={status()}>
          <TraceIcon>
            <StatusIcon status={status()} />
          </TraceIcon>
          <TraceTitle>{local.task.title}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent keepMounted>
        <Trace>
          <For each={steps()}>
            {(step) => (
              <TraceLine status={step.status}>
                <TraceTitle>{step.title}</TraceTitle>
              </TraceLine>
            )}
          </For>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
