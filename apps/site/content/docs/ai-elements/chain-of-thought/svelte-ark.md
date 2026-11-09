# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="svelte/ark" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="svelte/ark" -->

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

```svelte showLineNumbers title="ChainOfThought.svelte"
<script lang="ts">

  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "@/components/ui/trace"
  import StatusIcon from "./StatusIcon.svelte"
  import StepRow from "./StepRow.svelte"
  import type { Status, StepPart } from "./types"

  let {
    steps, streaming, answering }: {
    steps: StepPart[]
    streaming: boolean
    answering: boolean
  } = $props()

  let open = $state<boolean>()
  const running = $derived.by(() => streaming && !answering)
  const failed = $derived.by(
    () => steps.filter((part) => part.state === "output-error").length
  )
  const status = $derived.by<Status>(() => running ? "running" : failed > 0 ? "error" : undefined
  )
</script>

<Trace>
  <TraceCollapsible open={open ?? running} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
    <TraceCollapsibleTrigger>
      <TraceLine status={status}>
        <TraceIcon>
          <StatusIcon status={status} />
        </TraceIcon>
        <TraceTitle>
          {running
              ? "Researching"
              : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ""}`}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        {#each steps as part (part.toolCallId)}
          <StepRow part={part} streaming={streaming} />
        {/each}
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

```svelte showLineNumbers title="StepRow.svelte"
<script lang="ts">
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import { Badge } from "@/components/ui/badge"
  import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
  import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
  import { css } from "@kirana-style/core"
  import { fontFamily, space } from "@/lib/kirana/scales"
  import Step from "./Step.svelte"
  import type { Status, StepPart } from "./types"

  let { part, streaming }: {
    part: StepPart
    streaming: boolean
  } = $props()

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

  const status = $derived.by<Status>(() => part.state === "output-available"
      ? undefined
      : part.state === "output-error" || !streaming
        ? "error"
        : "running"
  )
  const verb = (running: string, done: string, failed: string) =>
    status === "running"
      ? running
      : status === "error"
        ? failed
        : done
  const content = $derived.by(
    () => part.state === "output-error" || part.state === "output-available"
  )
</script>

{#if part.type === 'tool-searchWeb'}
  <Step status={status} content={content} title={`${verb('Searching', 'Searched', 'Failed to search')} the web for ${part.input?.query}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <Trace>
        {#each part.output.results as result (result.url)}
          <a href={result.url} target="_blank" rel="noreferrer">
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
              </TraceIcon>
              <TraceTitle>
                {result.title}
                <span sx={styles.stepRowSpan}>
                  (opens in a new tab)
                </span>
              </TraceTitle>
              <TraceIcon>
                <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" />
              </TraceIcon>
            </TraceLine>
          </a>
        {/each}
      </Trace>
    {/if}
  </Step>
{:else if part.type === 'tool-readBuildLog'}
  <Step status={status} content={content} defaultOpen title={`${verb('Reading', 'Read', 'Failed to read')} the build log for ${part.input?.deployment}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent2}>{part.output.log}</CodeBlockContent>
      </CodeBlock>
    {/if}
  </Step>
{:else}
  <Step status={status} content={content} title={`${verb('Searching', 'Searched', 'Failed to search')} the code for ${part.input?.query}`}>
    {#if part.state === 'output-error'}
      <CodeBlock size="sm" variant="destructive">
        <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>{part.errorText}</CodeBlockContent>
      </CodeBlock>
    {:else if part.state === 'output-available'}
      <div sx={styles.stepRowDiv}>
        {#each part.output.files as file (file)}
          <Badge variant="secondary" sx={styles.stepRowBadge}>
            {file}
          </Badge>
        {/each}
      </div>
    {/if}
  </Step>
{/if}
```

```svelte showLineNumbers title="Step.svelte"
<script lang="ts">
  import type { Snippet } from "svelte"

  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "@/components/ui/trace"
  import StatusIcon from "./StatusIcon.svelte"
  import type { Status } from "./types"

  /** A step: a line, or a collapsible line when it has `content` to show. */
  let { title, status, defaultOpen, content, children }: { title: string
    status?: Status
    defaultOpen?: boolean
    content: boolean
    children?: Snippet } = $props()
</script>

{#if content}
  <TraceCollapsible defaultOpen={defaultOpen}>
    <TraceCollapsibleTrigger>
      <TraceLine status={status}>
        <TraceIcon>
          <StatusIcon status={status} />
        </TraceIcon>
        <TraceTitle>
          {title}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      {@render children?.()}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={status}>
    <TraceIcon>
      <StatusIcon status={status} />
    </TraceIcon>
    <TraceTitle>
      {title}
    </TraceTitle>
  </TraceLine>
{/if}
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
