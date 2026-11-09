import { TodoLine } from "./todo-line"
import { For, Show, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"
import type { Todo } from "./types"

export function TodoQueue(props: {
  todos: Todo[]
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["todos", "streaming", "sx", "class"])
  const pending = createMemo(() =>
    local.todos.filter((todo) => todo.status !== "completed")
  )
  const completed = createMemo(() =>
    local.todos.filter((todo) => todo.status === "completed")
  )

  return (
    <Trace>
      <Show when={pending().length > 0}>
        <TraceCollapsible defaultOpen>
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
              <TraceTitle>{pending().length} to do</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <For each={pending()}>
                {(todo) => <TodoLine todo={todo} streaming={local.streaming} />}
              </For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Show>
      <Show when={completed().length > 0}>
        <TraceCollapsible defaultOpen>
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
              <TraceTitle>{completed().length} completed</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <For each={completed()}>
                {(todo) => <TodoLine todo={todo} streaming={local.streaming} />}
              </For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Show>
    </Trace>
  )
}
