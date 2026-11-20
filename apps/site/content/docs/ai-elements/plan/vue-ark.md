# Plan

<!-- ::preview item="plan-demo" height="470" combinations="vue/ark" runtimes="ai-sdk,tanstack-ai" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/ark" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="plan-demo" parts="true" combinations="vue/ark" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="plan-demo-tanstack-ai" parts="true" combinations="vue/ark" -->

<!-- ::end:runtime -->

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="vue/ark" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

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

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI streams no data parts. The agent writes its plan with a tool, `updatePlan` in this example. Each call sends the whole plan, so render the last call whose input has arrived: a call's `input` is set once its arguments are complete.

```ts showLineNumbers title="app/api/chat/route.ts"
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the plan before you start, and again as each step moves.",
  inputSchema: planSchema,
  outputSchema: z.string(),
}).server(async () => "Updated the plan.")

const stream = chat({ adapter, messages, threadId, tools: [updatePlan] })
```

```ts showLineNumbers
const plan = message.parts
  .filter((part) => part.type === "tool-call")
  .filter((part) => part.name === "updatePlan")
  .at(-1)?.input
```

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
