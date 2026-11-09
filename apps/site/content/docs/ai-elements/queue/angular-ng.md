# Queue

<!-- ::preview item="queue-demo" height="470" combinations="angular/ng" -->

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `Trace` with a `TraceCollapsible` for each section.

## Installation

Queue is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="angular/ng" -->

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

```ts showLineNumbers title="todo-queue.ts"
import { Component, computed, input } from "@angular/core"
import type { Todo } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { TodoLine } from "./todo-line"

@Component({
  selector: "kui-todo-queue",
  imports: [
    TodoLine,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiTrace>
      @if (pending().length > 0) {
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="ListTodoIcon"
                  tabler="IconChecklist"
                  hugeicons="TaskDone01Icon"
                  phosphor="CheckSquareOffsetIcon"
                  remixicon="RiTaskLine"
                ></svg>
              </span>
              <span kuiTraceTitle>
                {{ pending().length }}
                to do
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiTrace>
              @for (todo of pending(); track todo.content) {
                <kui-todo-line [todo]="todo" [streaming]="streaming()" />
              }
            </div>
          </div>
        </div>
      }
      @if (completed().length > 0) {
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="ListChecksIcon"
                  tabler="IconListCheck"
                  hugeicons="CheckListIcon"
                  phosphor="ListChecksIcon"
                  remixicon="RiListCheck3"
                ></svg>
              </span>
              <span kuiTraceTitle>
                {{ completed().length }}
                completed
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiTrace>
              @for (todo of completed(); track todo.content) {
                <kui-todo-line [todo]="todo" [streaming]="streaming()" />
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class TodoQueue {
  readonly todos = input.required<Todo[]>()
  readonly streaming = input.required<boolean>()
  protected readonly pending = computed(() =>
    this.todos().filter((todo) => todo.status !== "completed")
  )
  protected readonly completed = computed(() =>
    this.todos().filter((todo) => todo.status === "completed")
  )
}
```

```ts showLineNumbers title="todo-line.ts"
import { Component, input } from "@angular/core"
import type { Todo } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

@Component({
  selector: "kui-todo-line",
  imports: [TraceIcon, TraceLine, TraceTitle, IconPlaceholder],
  host: { style: "display: contents" },
  template: `
    <span
      kuiTraceLine
      [status]="
        streaming() && todo().status === 'in_progress' ? 'running' : undefined
      "
    >
      <span kuiTraceIcon>
        @if (todo().status === "completed") {
          <svg
            iconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          ></svg>
        } @else {
          @if (todo().status === "in_progress") {
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
      <span kuiTraceTitle>{{ todo().content }}</span>
    </span>
  `,
})
export class TodoLine {
  readonly todo = input.required<Todo>()
  readonly streaming = input.required<boolean>()
}
```

## Descriptions

A todo with a description is a `TraceCollapsible` that opens to show it. A todo without one stays a `TraceLine`.

<!-- ::preview item="queue-descriptions" height="380" combinations="angular/ng" -->

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
