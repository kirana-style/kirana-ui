import { TodoRow } from "../components/queue-descriptions/todo-row"
import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function QueueDescriptions() {
  const styles = {
    trace: css({
      maxWidth: { "*": null, base: containerSize.sm },
    }),
  }

  const todos: { title: string; description?: string; done: boolean }[] = [
    {
      title: "Write the migration guide",
      description: "Cover the renamed props and the new data attributes.",
      done: true,
    },
    { title: "Add a changeset", done: true },
    {
      title: "Fix the focus ring on the select trigger",
      description: "It is clipped by overflow-hidden on the field.",
      done: false,
    },
    { title: "Update the registry snapshots", done: false },
    {
      title: "Add tests for the combobox",
      description: "Typing, clearing and keyboard selection.",
      done: false,
    },
  ]

  const pending = todos.filter((todo) => !todo.done)
  const completed = todos.filter((todo) => todo.done)

  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
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
              <TraceTitle>{pending.length} to do</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <For each={pending}>{(todo) => <TodoRow todo={todo} />}</For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible>
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
              <TraceTitle>{completed.length} completed</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <For each={completed}>{(todo) => <TodoRow todo={todo} />}</For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  )
}
