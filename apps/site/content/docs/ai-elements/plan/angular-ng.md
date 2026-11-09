# Plan

<!-- ::preview item="plan-demo" height="470" combinations="angular/ng" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="angular/ng" -->

## Usage

```ts showLineNumbers
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

```ts showLineNumbers title="plan-row.ts"
import { Component, computed, input } from "@angular/core"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

@Component({
  selector: "kui-plan-row",
  imports: [
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiTraceCollapsible defaultOpen>
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="running() ? 'running' : undefined">
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="RouteIcon"
              tabler="IconRoute"
              hugeicons="Route01Icon"
              phosphor="PathIcon"
              remixicon="RiRouteLine"
            ></svg>
          </span>
          <span kuiTraceTitle>{{ plan().title }}</span>
          <span kuiTraceDescription>
            {{ done() }}
            of
            {{ plan().steps.length }}
            done
          </span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent>
        <div kuiTrace>
          @for (step of plan().steps; track step.title) {
            <span
              kuiTraceLine
              [status]="
                step.status === 'pending'
                  ? 'pending'
                  : streaming() && step.status === 'running'
                    ? 'running'
                    : undefined
              "
            >
              <span kuiTraceIcon>
                @if (step.status === "done") {
                  <svg
                    iconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
                  ></svg>
                } @else {
                  @if (step.status === "running") {
                    <svg
                      iconPlaceholder
                      lucide="CircleDotIcon"
                      tabler="IconCircleDot"
                      hugeicons="RecordIcon"
                      phosphor="RecordIcon"
                      remixicon="RiRecordCircleLine"
                    ></svg>
                  } @else {
                    <svg
                      iconPlaceholder
                      lucide="CircleIcon"
                      tabler="IconCircle"
                      hugeicons="CircleIcon"
                      phosphor="CircleIcon"
                      remixicon="RiCheckboxBlankCircleLine"
                    ></svg>
                  }
                }
              </span>
              <span kuiTraceTitle>{{ step.title }}</span>
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class PlanRow {
  readonly plan = input.required<Plan>()
  readonly streaming = input.required<boolean>()
  protected readonly done = computed(
    () => this.plan().steps.filter((step) => step.status === "done").length
  )
  protected readonly running = computed(
    () => this.streaming() && this.done() < this.plan().steps.length
  )
}
```

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="angular/ng" -->

## AI SDK

Stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts showLineNumbers title="app/api/chat/route.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-plan", id: "plan", data: { title, steps } })
  },
})
```

```ts showLineNumbers
const plan = message.parts.find((part) => part.type === "data-plan")
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
