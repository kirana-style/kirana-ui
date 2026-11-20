# Task

<!-- ::preview item="task-demo" runtimes="ai-sdk,tanstack-ai" height="490" combinations="svelte/kirana" -->

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

<!-- ::installation name="trace" combinations="svelte/kirana" -->

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

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="task-demo" parts="true" combinations="svelte/kirana" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="task-demo-tanstack-ai" parts="true" combinations="svelte/kirana" -->

<!-- ::end:runtime -->

## Status

Set the task's status from its steps. Write the title in the present tense while the task runs, and in the past tense once it is done.

| Steps                   | `status`    | Title                              |
| ----------------------- | ----------- | ---------------------------------- |
| A step is still running | `"running"` | Updating the page metadata         |
| A step failed           | `"error"`   | Failed to update the page metadata |
| Every step is done      | none        | Updated the page metadata          |

Put several tasks in one `Trace`. Keep the running task open, and close each task once it is done.

## In a Chat

<!-- ::start:runtime ai-sdk -->

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

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI has no data part. Give the agent a tool that takes a task with its `id`, and draw each task from its last call. Calling it again with a new step updates the task.

```ts showLineNumbers title="app/api/chat/route.ts"
const updateTask = toolDefinition({
  name: "updateTask",
  description: "Write a task, and write it again when a step changes.",
  inputSchema: z.object({
    id: z.string(),
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        status: z.enum(["running", "done", "error"]),
      })
    ),
  }),
}).server(async () => "Updated the task.")
```

```ts showLineNumbers
const tasks = new Map()
for (const part of message.parts) {
  if (part.type === "tool-call" && part.name === "updateTask" && part.input)
    tasks.set(part.input.id, part.input)
}
```

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
