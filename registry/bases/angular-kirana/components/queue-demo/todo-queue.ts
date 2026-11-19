import { Component, computed, input } from "@angular/core"
import type { Todo } from "./types"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
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
