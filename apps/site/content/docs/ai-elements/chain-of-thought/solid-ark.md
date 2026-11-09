# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="solid/ark" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    searchWeb: {
      input: { query: string }
      output: { results: { title: string; url: string }[] }
    }
    readBuildLog: {
      input: { deployment: string }
      output: { log: string }
    }
    searchCode: {
      input: { query: string }
      output: { files: string[] }
    }
  }
>

export type StepPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-searchWeb" | "tool-readBuildLog" | "tool-searchCode" }
>

export type Status = "running" | "error" | undefined
```

```tsx showLineNumbers title="chain-of-thought.tsx"
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
} from "@/components/ui/trace"
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
```

```tsx showLineNumbers title="step-row.tsx"
import { Step } from "./step"
import { For, Show, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import { Badge } from "@/components/ui/badge"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "@/lib/kirana/scales"
import type { Sx } from "@kirana-style/core"
import type { Status, StepPart } from "./types"

export function StepRow(props: {
  part: StepPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
  const styles = {
    stepRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
    stepRowCodeBlockContent2: css({
      maxHeight: { "*": null, base: space[64] },
    }),
    stepRowDiv: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space["1.5"],
    }),
    stepRowBadge: css({
      fontFamily: { "*": null, base: fontFamily.mono },
    }),
  }

  const status = createMemo<Status>(() =>
    local.part.state === "output-available"
      ? undefined
      : local.part.state === "output-error" || !local.streaming
        ? "error"
        : "running"
  )
  const verb = (running: string, done: string, failed: string) =>
    status() === "running" ? running : status() === "error" ? failed : done
  const content = createMemo(
    () =>
      local.part.state === "output-error" ||
      local.part.state === "output-available"
  )

  return (
    <>
      {local.part.type === "tool-searchWeb" ? (
        <Step
          status={status()}
          content={content()}
          title={`${verb("Searching", "Searched", "Failed to search")} the web for ${local.part.input?.query}`}
        >
          {local.part.state === "output-error" ? (
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                {local.part.errorText}
              </CodeBlockContent>
            </CodeBlock>
          ) : (
            <Show when={local.part.state === "output-available"}>
              <Trace>
                <For each={local.part.output!.results}>
                  {(result) => (
                    <a href={result.url} target="_blank" rel="noreferrer">
                      <TraceLine>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="GlobeIcon"
                            tabler="IconGlobe"
                            hugeicons="Globe02Icon"
                            phosphor="GlobeIcon"
                            remixicon="RiGlobeLine"
                          />
                        </TraceIcon>
                        <TraceTitle>
                          {result.title}{" "}
                          <span sx={styles.stepRowSpan}>
                            (opens in a new tab)
                          </span>
                        </TraceTitle>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="ArrowUpRightIcon"
                            tabler="IconArrowUpRight"
                            hugeicons="ArrowUpRightIcon"
                            phosphor="ArrowUpRightIcon"
                            remixicon="RiArrowRightUpLine"
                          />
                        </TraceIcon>
                      </TraceLine>
                    </a>
                  )}
                </For>
              </Trace>
            </Show>
          )}
        </Step>
      ) : (
        <>
          {local.part.type === "tool-readBuildLog" ? (
            <Step
              status={status()}
              content={content()}
              defaultOpen
              title={`${verb("Reading", "Read", "Failed to read")} the build log for ${local.part.input?.deployment}`}
            >
              {local.part.state === "output-error" ? (
                <CodeBlock size="sm" variant="destructive">
                  <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                    {local.part.errorText}
                  </CodeBlockContent>
                </CodeBlock>
              ) : (
                <Show when={local.part.state === "output-available"}>
                  <CodeBlock size="sm">
                    <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent2}>
                      {local.part.output!.log}
                    </CodeBlockContent>
                  </CodeBlock>
                </Show>
              )}
            </Step>
          ) : (
            <Step
              status={status()}
              content={content()}
              title={`${verb("Searching", "Searched", "Failed to search")} the code for ${local.part.input?.query}`}
            >
              {local.part.state === "output-error" ? (
                <CodeBlock size="sm" variant="destructive">
                  <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
                    {local.part.errorText}
                  </CodeBlockContent>
                </CodeBlock>
              ) : (
                <Show when={local.part.state === "output-available"}>
                  <div sx={styles.stepRowDiv}>
                    <For each={local.part.output!.files}>
                      {(file) => (
                        <Badge variant="secondary" sx={styles.stepRowBadge}>
                          {file}
                        </Badge>
                      )}
                    </For>
                  </div>
                </Show>
              )}
            </Step>
          )}
        </>
      )}
    </>
  )
}
```

```tsx showLineNumbers title="step.tsx"
import { StatusIcon } from "./status-icon"
import { splitProps } from "solid-js"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
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
```

## Steps

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

## AI SDK

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

`StepLine` renders one tool part as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
