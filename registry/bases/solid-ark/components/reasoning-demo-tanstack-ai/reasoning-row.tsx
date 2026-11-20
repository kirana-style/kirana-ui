import { createSignal, splitProps, untrack } from "solid-js"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

export function ReasoningRow(props: {
  text: string
  running: boolean
  defaultOpen?: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "defaultOpen",
    "text",
    "running",
    "sx",
    "class",
  ])
  const styles = {
    reasoningRowTraceCollapsibleContent: css({
      whiteSpace: { "*": null, base: "pre-wrap" },
    }),
  }

  // Open while it runs, until the reader opens or closes it.
  const [open, setOpen] = createSignal(untrack(() => local.defaultOpen))

  return (
    <>
      {local.text.length === 0 ? (
        <TraceLine status={local.running ? "running" : undefined}>
          <TraceTitle>
            {local.running ? "Thinking" : "Thought for 5s"}
          </TraceTitle>
        </TraceLine>
      ) : (
        <TraceCollapsible
          open={open() ?? local.running}
          onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
        >
          <TraceCollapsibleTrigger>
            <TraceLine status={local.running ? "running" : undefined}>
              <TraceTitle>
                {local.running ? "Thinking" : "Thought for 5s"}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent
            sx={styles.reasoningRowTraceCollapsibleContent}
          >
            {local.text}
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </>
  )
}
