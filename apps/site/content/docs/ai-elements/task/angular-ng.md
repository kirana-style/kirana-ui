# Task

<!-- ::preview item="task-demo" height="490" combinations="angular/ng" -->

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

<!-- ::installation name="trace" combinations="angular/ng" -->

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

```ts showLineNumbers title="task-row.ts"
import { Component, computed, input, signal } from "@angular/core"
import type { Status, TaskPart } from "./types"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { StatusIcon } from "./status-icon"

function getStepStatus(
  status: TaskPart["data"]["steps"][number]["status"],
  streaming: boolean
): Status {
  if (status === "done") {
    return undefined
  }

  return status === "running" && streaming ? "running" : "error"
}

@Component({
  selector: "kui-task-row",
  imports: [
    StatusIcon,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kuiTraceCollapsible
      [open]="open() ?? status() === 'running'"
      (openChange)="open.set($event)"
    >
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="status()">
          <span kuiTraceIcon>
            <kui-status-icon [status]="status()" />
          </span>
          <span kuiTraceTitle>{{ task().title }}</span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent keepMounted>
        <div kuiTrace>
          @for (step of steps(); track step.title) {
            <span kuiTraceLine [status]="step.status">
              <span kuiTraceTitle>{{ step.title }}</span>
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class TaskRow {
  readonly task = input.required<TaskPart["data"]>()
  readonly streaming = input.required<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly steps = computed(() =>
    this.task().steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, this.streaming()),
    }))
  )
  protected readonly status = computed<Status>(() =>
    this.steps().some((step) => step.status === "error")
      ? "error"
      : this.steps().some((step) => step.status === "running")
        ? "running"
        : undefined
  )
}
```

```ts showLineNumbers title="status-icon.ts"
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import type { Status } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  statusIconIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

@Component({
  selector: "kui-status-icon",
  imports: [IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    @if (status() === "running") {
      <svg
        iconPlaceholder
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        [sx]="styles.statusIconIconPlaceholder"
      ></svg>
    } @else if (status() === "error") {
      <svg
        iconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconExclamationCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      ></svg>
    } @else {
      <svg
        iconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      ></svg>
    }
  `,
})
export class StatusIcon {
  readonly status = input.required<Status>()
  protected readonly styles = styles
}
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
