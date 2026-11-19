import { Component, input } from "@angular/core"
import type { Todo } from "./types"
import { IconPlaceholder } from "../../../../icons/angular"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"

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
