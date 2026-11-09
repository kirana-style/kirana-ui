# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="solid/ark" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="solid/ark" -->

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

```ts showLineNumbers title="types.ts"
import type { UIDataTypes, UIMessage } from "ai"

export type SubagentMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type SubagentPart = SubagentMessage["parts"][number]

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    researchAgent: {
      input: { task: string }
      output: SubagentMessage
    }
  }
>

export type Part = ChatMessage["parts"][number]
```

```tsx showLineNumbers title="subagent-row.tsx"
import { StepRow } from "./step-row"
import { SubagentLine } from "./subagent-line"
import { For, Show, createMemo, splitProps } from "solid-js"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { Sx } from "@kirana-style/core"
import type { Part } from "./types"

export function SubagentRow(props: {
  part: Extract<Part, { type: "tool-researchAgent" }>
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
  const styles = {
    subagentRowTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
  }

  const done = createMemo(
    () => local.part.state === "output-available" && !local.part.preliminary
  )
  const running = createMemo(
    () => !done() && local.part.state !== "output-error" && local.streaming
  )
  const parts = createMemo(() =>
    local.part.state === "output-available" ? local.part.output.parts : []
  )
  const report = createMemo(() =>
    parts()
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("")
  )

  return (
    <>
      {parts().length === 0 ? (
        <SubagentLine done={done()} running={running()} />
      ) : (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <SubagentLine done={done()} running={running()} />
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent
            keepMounted
            sx={styles.subagentRowTraceCollapsibleContent}
          >
            <Trace>
              <For each={parts()}>
                {(agentPart) => (
                  <Show
                    when={agentPart.type === "tool-runCommand" && agentPart}
                  >
                    {(step) => <StepRow part={step()} running={running()} />}
                  </Show>
                )}
              </For>
            </Trace>
            <Show when={report()}>
              <p>{report()}</p>
            </Show>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </>
  )
}
```

```tsx showLineNumbers title="subagent-line.tsx"
import { splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import type { Sx } from "@kirana-style/core"

export function SubagentLine(props: {
  done: boolean
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["done", "running", "sx", "class"])
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    subagentRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  return (
    <TraceLine
      status={local.done ? undefined : local.running ? "running" : "error"}
    >
      <TraceIcon>
        {local.done ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        ) : (
          <>
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.subagentRowIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="CircleAlertIcon"
                tabler="IconExclamationCircle"
                hugeicons="AlertCircleIcon"
                phosphor="WarningCircleIcon"
                remixicon="RiErrorWarningLine"
              />
            )}
          </>
        )}
      </TraceIcon>
      <TraceTitle>
        {local.done ? "Ran" : local.running ? "Running" : "Failed to run"} the
        research subagent
      </TraceTitle>
    </TraceLine>
  )
}
```

```tsx showLineNumbers title="step-row.tsx"
import { createMemo, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { space } from "@/lib/kirana/scales"
import type { Sx } from "@kirana-style/core"
import type { SubagentPart } from "./types"

export function StepRow(props: {
  part: Extract<SubagentPart, { type: "tool-runCommand" }>
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "running", "sx", "class"])
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    stepRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  const command = createMemo(() => local.part.input?.command)

  return (
    <>
      {local.part.state === "output-available" ? (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CircleCheckIcon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle01Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleFill"
                />
              </TraceIcon>
              <TraceTitle>Ran {command()}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                {local.part.output.stdout}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine status={local.running ? "running" : "error"}>
          <TraceIcon>
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.stepRowIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="CircleAlertIcon"
                tabler="IconExclamationCircle"
                hugeicons="AlertCircleIcon"
                phosphor="WarningCircleIcon"
                remixicon="RiErrorWarningLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.running ? "Running" : "Failed to run"} {command()}
          </TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="solid/ark" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="solid/ark" -->

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## API Reference

See [Trace](/docs/components/trace#api-reference).
