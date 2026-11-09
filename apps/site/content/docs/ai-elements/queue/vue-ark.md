# Queue

<!-- ::preview item="queue-demo" height="470" combinations="vue/ark" -->

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `Trace` with a `TraceCollapsible` for each section.

## Installation

Queue is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/ark" -->

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

```vue showLineNumbers title="TodoQueue.vue"
<script setup lang="ts">
import { computed } from "vue"
import type { Todo } from "./types"
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import TodoLine from "./TodoLine.vue"

const { todos } = defineProps<{ todos: Todo[]; streaming: boolean }>()
const pending = computed(() =>
  todos.filter((todo) => todo.status !== "completed")
)
const completed = computed(() =>
  todos.filter((todo) => todo.status === "completed")
)
</script>

<template>
  <Trace>
    <TraceCollapsible v-if="pending.length > 0" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="ListTodoIcon"
              tabler="IconChecklist"
              hugeicons="TaskDone01Icon"
              phosphor="CheckSquareOffsetIcon"
              remixicon="RiTaskLine"
            />
          </TraceIcon>
          <TraceTitle> {{ pending.length }} to do </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TodoLine
            v-for="todo in pending"
            :key="todo.content"
            :todo="todo"
            :streaming="streaming"
          />
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible v-if="completed.length > 0" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="ListChecksIcon"
              tabler="IconListCheck"
              hugeicons="CheckListIcon"
              phosphor="ListChecksIcon"
              remixicon="RiListCheck3"
            />
          </TraceIcon>
          <TraceTitle> {{ completed.length }} completed </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TodoLine
            v-for="todo in completed"
            :key="todo.content"
            :todo="todo"
            :streaming="streaming"
          />
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

```vue showLineNumbers title="TodoLine.vue"
<script setup lang="ts">
import type { Todo } from "./types"
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

defineProps<{ todo: Todo; streaming: boolean }>()
</script>

<template>
  <TraceLine
    :status="streaming && todo.status === 'in_progress' ? 'running' : undefined"
  >
    <TraceIcon>
      <IconPlaceholder
        v-if="todo.status === 'completed'"
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      />
      <template v-else>
        <IconPlaceholder
          v-if="todo.status === 'in_progress'"
          lucide="CircleDotIcon"
          tabler="IconCircleDot"
          hugeicons="RecordIcon"
          phosphor="RecordIcon"
          remixicon="RiRecordCircleLine"
        />
        <IconPlaceholder
          v-else
          lucide="CircleIcon"
          tabler="IconCircle"
          hugeicons="CircleIcon"
          phosphor="CircleIcon"
          remixicon="RiCheckboxBlankCircleLine"
        />
      </template>
    </TraceIcon>
    <TraceTitle>
      {{ todo.content }}
    </TraceTitle>
  </TraceLine>
</template>
```

## Descriptions

A todo with a description is a `TraceCollapsible` that opens to show it. A todo without one stays a `TraceLine`.

<!-- ::preview item="queue-descriptions" height="380" combinations="vue/ark" -->

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
