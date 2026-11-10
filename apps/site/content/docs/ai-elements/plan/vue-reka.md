# Plan

<!-- ::preview item="plan-demo" height="470" combinations="vue/reka" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/reka" -->

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

<!-- ::demo-source item="plan-demo" parts="true" combinations="vue/reka" -->

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="vue/reka" -->

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
