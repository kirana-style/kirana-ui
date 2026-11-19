import { Component, input } from "@angular/core"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

export type Todo = { title: string; description?: string; done: boolean }

@Component({
  selector: "kui-todo-row",
  imports: [
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
    @if (todo().description) {
      <div kuiTraceCollapsible>
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine>
            <span kuiTraceIcon>
              @if (todo().done) {
                <svg
                  iconPlaceholder
                  lucide="CircleCheckIcon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle01Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleFill"
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
            </span>
            <span kuiTraceTitle>{{ todo().title }}</span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>{{ todo().description }}</div>
      </div>
    } @else {
      <span kuiTraceLine>
        <span kuiTraceIcon>
          @if (todo().done) {
            <svg
              iconPlaceholder
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
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
        </span>
        <span kuiTraceTitle>{{ todo().title }}</span>
      </span>
    }
  `,
})
export class TodoRow {
  readonly todo = input.required<Todo>()
}
