import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { TodoRow } from "../components/queue-descriptions/todo-row"

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

@Component({
  selector: "queue-descriptions",
  imports: [
    TodoRow,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.trace">
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
                {{ pending.length }}
                to do
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keepMounted>
            <div kuiTrace>
              @for (todo of pending; track todo.title) {
                <kui-todo-row [todo]="todo" />
              }
            </div>
          </div>
        </div>
        <div kuiTraceCollapsible>
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
                {{ completed.length }}
                completed
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keepMounted>
            <div kuiTrace>
              @for (todo of completed; track todo.title) {
                <kui-todo-row [todo]="todo" />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class QueueDescriptions {
  protected readonly styles = styles
  protected readonly pending = pending
  protected readonly completed = completed
  protected readonly page = page
}
