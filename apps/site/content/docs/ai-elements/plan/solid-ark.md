# Plan

<!-- ::preview item="plan-demo" height="470" combinations="solid/ark" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="solid/ark" -->

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

```tsx showLineNumbers title="plan-row.tsx"
import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
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
import type { Sx } from "@kirana-style/core"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

export function PlanRow(props: {
  plan: Plan
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["plan", "streaming", "sx", "class"])
  const done = createMemo(
    () => local.plan.steps.filter((step) => step.status === "done").length
  )
  const running = createMemo(
    () => local.streaming && done() < local.plan.steps.length
  )

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine status={running() ? "running" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="RouteIcon"
              tabler="IconRoute"
              hugeicons="Route01Icon"
              phosphor="PathIcon"
              remixicon="RiRouteLine"
            />
          </TraceIcon>
          <TraceTitle>{local.plan.title}</TraceTitle>
          <TraceDescription>
            {done()} of {local.plan.steps.length} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <For each={local.plan.steps}>
            {(step) => (
              <>
                <TraceLine
                  status={
                    step.status === "pending"
                      ? "pending"
                      : local.streaming && step.status === "running"
                        ? "running"
                        : undefined
                  }
                >
                  <TraceIcon>
                    {step.status === "done" ? (
                      <IconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheckFilled"
                        hugeicons="CheckmarkCircle01Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleFill"
                      />
                    ) : (
                      <>
                        {step.status === "running" ? (
                          <IconPlaceholder
                            lucide="CircleDotIcon"
                            tabler="IconCircleDot"
                            hugeicons="RecordIcon"
                            phosphor="RecordIcon"
                            remixicon="RiRecordCircleLine"
                          />
                        ) : (
                          <IconPlaceholder
                            lucide="CircleIcon"
                            tabler="IconCircle"
                            hugeicons="CircleIcon"
                            phosphor="CircleIcon"
                            remixicon="RiCheckboxBlankCircleLine"
                          />
                        )}
                      </>
                    )}
                  </TraceIcon>
                  <TraceTitle>{step.title}</TraceTitle>
                </TraceLine>
              </>
            )}
          </For>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
```

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="solid/ark" -->

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
