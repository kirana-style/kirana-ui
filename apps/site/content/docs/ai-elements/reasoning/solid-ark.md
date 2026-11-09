# Reasoning

<!-- ::preview item="reasoning-demo" height="520" combinations="solid/ark" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="solid/ark" -->

## Usage

```ts showLineNumbers
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

```tsx showLineNumbers title="reasoning-row.tsx"
import { createSignal, splitProps, untrack } from "solid-js"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
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
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="solid/ark" -->

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## API Reference

See [Trace](/docs/components/trace#api-reference).
