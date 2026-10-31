---
title: Task
description: Displays the steps the agent takes, as it takes them.
section: ai-elements
variants: [react/base, react/aria]
keywords: [task, ai elements, agent, chat]
---

# Task

<!-- ::preview item="task-demo" height="490" combinations="react/base,react/aria" -->

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

<!-- ::installation name="trace" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
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

<!-- ::start:only react/base -->

```tsx showLineNumbers
<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceTitle>Found the project files</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <SearchIcon />
          </TraceIcon>
          <TraceTitle>Searched for app/page.tsx</TraceTitle>
        </TraceLine>
        <a href="/files/app/page.tsx">
          <TraceLine>
            <TraceIcon>
              <FileTextIcon />
            </TraceIcon>
            <TraceTitle>Read app/page.tsx</TraceTitle>
          </TraceLine>
        </a>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<Trace>
  <TraceCollapsible defaultExpanded>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceTitle>Found the project files</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <SearchIcon />
          </TraceIcon>
          <TraceTitle>Searched for app/page.tsx</TraceTitle>
        </TraceLine>
        <a href="/files/app/page.tsx">
          <TraceLine>
            <TraceIcon>
              <FileTextIcon />
            </TraceIcon>
            <TraceTitle>Read app/page.tsx</TraceTitle>
          </TraceLine>
        </a>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

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

```tsx showLineNumbers
const tasks = message.parts.filter((part) => part.type === "data-task")
```

## Migrating from AI SDK Elements

If you added Task from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/task.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/task.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/base/task.md and build Task the same way.
3. Rebuild each part:
   - Task renders a Trace with a TraceCollapsible.
   - TaskTrigger renders a TraceCollapsibleTrigger with a TraceLine and a TraceTitle with title.
   - TaskContent renders a TraceCollapsibleContent with keepMounted, and a Trace for the steps.
   - TaskItem renders a TraceLine with a TraceTitle.
   - Keep TaskItemFile as it is.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/task.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/task.md and build Task the same way.
3. Rebuild each part:
   - Task renders a Trace with a TraceCollapsible.
   - TaskTrigger renders a TraceCollapsibleTrigger with a TraceLine and a TraceTitle with title.
   - TaskContent renders a TraceCollapsibleContent with a Trace for the steps.
   - TaskItem renders a TraceLine with a TraceTitle.
   - Keep TaskItemFile as it is.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
