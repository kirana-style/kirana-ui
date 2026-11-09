# Queue

<!-- ::preview item="queue-demo" height="470" combinations="svelte/ark" -->

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `Trace` with a `TraceCollapsible` for each section.

## Installation

Queue is built with the [Trace](/docs/components/trace) component.

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
import type { UIDataTypes, UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    writeTodos: {
      input: {
        todos: {
          content: string
          status: "pending" | "in_progress" | "completed"
        }[]
      }
      output: string
    }
  }
>

export type Todo = Extract<
  ChatMessage["parts"][number],
  { type: "tool-writeTodos"; state: "input-available" }
>["input"]["todos"][number]
```

```svelte showLineNumbers title="TodoQueue.svelte"
<script lang="ts">

  import type { Todo } from "./types"
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "@/components/ui/trace"
  import TodoLine from "./TodoLine.svelte"

  let { todos, streaming }: { todos: Todo[]; streaming: boolean } = $props()

  const pending = $derived.by(() => todos.filter((todo) => todo.status !== "completed")
  )
  const completed = $derived.by(() => todos.filter((todo) => todo.status === "completed")
  )
</script>

<Trace>
  {#if pending.length > 0}
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="ListTodoIcon" tabler="IconChecklist" hugeicons="TaskDone01Icon" phosphor="CheckSquareOffsetIcon" remixicon="RiTaskLine" />
          </TraceIcon>
          <TraceTitle>
            {pending.length} to do
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {#each pending as todo (todo.content)}
            <TodoLine todo={todo} streaming={streaming} />
          {/each}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  {/if}
  {#if completed.length > 0}
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="ListChecksIcon" tabler="IconListCheck" hugeicons="CheckListIcon" phosphor="ListChecksIcon" remixicon="RiListCheck3" />
          </TraceIcon>
          <TraceTitle>
            {completed.length} completed
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {#each completed as todo (todo.content)}
            <TodoLine todo={todo} streaming={streaming} />
          {/each}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  {/if}
</Trace>
```

```svelte showLineNumbers title="TodoLine.svelte"
<script lang="ts">

  import type { Todo } from "./types"
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

  let { todo, streaming }: { todo: Todo; streaming: boolean } = $props()
</script>

<TraceLine status={streaming && todo.status === 'in_progress' ? 'running' : undefined}>
  <TraceIcon>
    {#if todo.status === 'completed'}
      <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
    {:else}
      {#if todo.status === 'in_progress'}
        <IconPlaceholder lucide="CircleDotIcon" tabler="IconCircleDot" hugeicons="RecordIcon" phosphor="RecordIcon" remixicon="RiRecordCircleLine" />
      {:else}
        <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
      {/if}
    {/if}
  </TraceIcon>
  <TraceTitle>
    {todo.content}
  </TraceTitle>
</TraceLine>
```

## Descriptions

A todo with a description is a `TraceCollapsible` that opens to show it. A todo without one stays a `TraceLine`.

<!-- ::preview item="queue-descriptions" height="380" combinations="svelte/ark" -->

## AI SDK

The agent writes its todos with a tool, `writeTodos` in this example. Each call sends the whole list, so render the last call and skip one whose input is still streaming.

```ts showLineNumbers
const todos = message.parts
  .filter((part) => part.type === "tool-writeTodos")
  .filter((part) => part.state !== "input-streaming")
  .at(-1)?.input?.todos
```

Map each todo status to a section, an icon and a `TraceLine` status. Set `"running"` on the todo in progress only while the chat streams, so its title stops shimmering when the agent stops.

| Todo status   | Section   | Icon              | `TraceLine` status                 |
| ------------- | --------- | ----------------- | ---------------------------------- |
| `pending`     | To do     | `CircleIcon`      | none                               |
| `in_progress` | To do     | `CircleDotIcon`   | `"running"` while the chat streams |
| `completed`   | Completed | `CircleCheckIcon` | none                               |

## API Reference

See [Trace](/docs/components/trace#api-reference).
