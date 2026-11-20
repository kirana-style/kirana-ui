# Plan

<!-- ::preview item="plan-demo" runtimes="ai-sdk,tanstack-ai" height="470" combinations="solid/ark" -->

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

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="plan-demo" parts="true" combinations="solid/ark" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="plan-demo-tanstack-ai" parts="true" combinations="solid/ark" -->

<!-- ::end:runtime -->

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="solid/ark" -->

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

TanStack AI's messages have no data parts. Have the agent write the whole plan with a tool each time a step moves, and draw the latest call.

```ts showLineNumbers title="lib/tools.ts"
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the plan, with each step's status.",
  inputSchema: z.object({
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        status: z.enum(["done", "running", "pending"]),
      })
    ),
  }),
})
```

```ts showLineNumbers
const plan = message.parts
  .filter((part) => part.type === "tool-call")
  .filter((part) => part.name === "updatePlan" && part.state === "complete")
  .at(-1)?.input
```

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
