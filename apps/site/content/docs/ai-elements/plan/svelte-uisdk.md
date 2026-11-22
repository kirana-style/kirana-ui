# Plan

<!-- ::preview item="plan-demo" runtimes="ai-sdk,tanstack-ai" height="470" combinations="svelte/uisdk" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="svelte/uisdk" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::demo-source item="plan-demo" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="plan-demo-tanstack-ai" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="svelte/uisdk" -->

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

TanStack AI has no data part. Give the agent a tool that takes the whole plan, and draw the plan from its last call. Skip a call whose input is still streaming.

```ts showLineNumbers title="app/api/chat/route.ts"
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the plan, and write it again when a step changes.",
  inputSchema: z.object({
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        status: z.enum(["pending", "running", "done"]),
      })
    ),
  }),
}).server(async () => "Updated the plan.")
```

```ts showLineNumbers
const plan = message.parts
  .filter((part) => part.type === "tool-call" && part.name === "updatePlan")
  .filter(
    (part) =>
      part.state !== "awaiting-input" && part.state !== "input-streaming"
  )
  .at(-1)?.input
```

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
