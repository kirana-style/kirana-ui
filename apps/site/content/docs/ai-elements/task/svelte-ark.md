# Task

<!-- ::preview item="task-demo" height="490" combinations="svelte/ark" -->

Task is a piece of work the agent is doing, such as finding the project files or updating a page. Each step, like a search, a read or an edit, appears under the task when the agent takes it.

Task is built with `Trace` with a `TraceCollapsible` for each task.

## Task or Plan

Both are a list of steps under a collapsible line. The difference is when the steps are known.

Use [Plan](/docs/ai-elements/plan) when the agent decides the steps before it starts. Use Task when the steps come from the work itself, and the agent only knows the next one once it has taken the last.

|               | Plan                                   | Task                                            |
| ------------- | -------------------------------------- | ----------------------------------------------- |
| Steps         | Every step, from the start             | Each step, once the agent takes it              |
| Pending steps | Yes, waiting their turn                | None                                            |
| Title         | The goal, with progress: "2 of 4 done" | What the agent is doing, then what it did       |
| Per reply     | One plan                               | One or more tasks, each closing when it is done |

## Installation

Task is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="svelte/ark" -->

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
import type { UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  {
    task: {
      title: string
      steps: { title: string; status: "done" | "running" | "error" }[]
    }
  }
>

export type TaskPart = Extract<
  ChatMessage["parts"][number],
  { type: "data-task" }
>

export type Status = "running" | "error" | undefined
```

```svelte showLineNumbers title="TaskRow.svelte"
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
  import type { Status, TaskPart } from "./types"

  let {
    task, streaming }: {
    task: TaskPart["data"]
    streaming: boolean
  } = $props()

  function getStepStatus(
    status: TaskPart["data"]["steps"][number]["status"],
    live: boolean
  ): Status {
    if (status === "done") {
      return undefined
    }

    return status === "running" && live ? "running" : "error"
  }

  let open = $state<boolean>()
  const steps = $derived.by(() => task.steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, streaming),
    }))
  )
  const status = $derived.by<Status>(() => steps.some((step) => step.status === "error")
      ? "error"
      : steps.some((step) => step.status === "running")
        ? "running"
        : undefined
  )
</script>

<TraceCollapsible open={open ?? status === 'running'} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
  <TraceCollapsibleTrigger>
    <TraceLine status={status}>
      <TraceIcon>
        <StatusIcon status={status} />
      </TraceIcon>
      <TraceTitle>
        {task.title}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent keepMounted>
    <Trace>
      {#each steps as step (step.title)}
        <TraceLine status={step.status}>
          <TraceTitle>
            {step.title}
          </TraceTitle>
        </TraceLine>
      {/each}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
```

```svelte showLineNumbers title="StatusIcon.svelte"
<script lang="ts">
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import { css, keyframes } from "@kirana-style/core"

  import type { Status } from "./types"

  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    statusIconIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
  }

  let { status }: { status: Status } = $props()
</script>

{#if status === 'running'}
  <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.statusIconIconPlaceholder} />
{:else if status === 'error'}
  <IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" />
{:else}
  <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
{/if}
```

## Status

Set the task's status from its steps. Write the title in the present tense while the task runs, and in the past tense once it is done.

| Steps                   | `status`    | Title                              |
| ----------------------- | ----------- | ---------------------------------- |
| A step is still running | `"running"` | Updating the page metadata         |
| A step failed           | `"error"`   | Failed to update the page metadata |
| Every step is done      | none        | Updated the page metadata          |

Put several tasks in one `Trace`. Keep the running task open, and close each task once it is done.

## AI SDK

Stream each task as a data part with its own `id`. The AI SDK replaces a data part with the same `id`, so writing a task again with a new step updates it in place.

```ts showLineNumbers title="app/api/chat/route.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-task", id: "update", data: { title, steps } })
  },
})
```

```ts showLineNumbers
const tasks = message.parts.filter((part) => part.type === "data-task")
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
