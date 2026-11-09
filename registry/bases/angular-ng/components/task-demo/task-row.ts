import { Component, computed, input, signal } from "@angular/core"
import type { Status, TaskPart } from "./types"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { StatusIcon } from "./status-icon"

function getStepStatus(
  status: TaskPart["data"]["steps"][number]["status"],
  streaming: boolean
): Status {
  if (status === "done") {
    return undefined
  }

  return status === "running" && streaming ? "running" : "error"
}

@Component({
  selector: "kui-task-row",
  imports: [
    StatusIcon,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kuiTraceCollapsible
      [open]="open() ?? status() === 'running'"
      (openChange)="open.set($event)"
    >
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="status()">
          <span kuiTraceIcon>
            <kui-status-icon [status]="status()" />
          </span>
          <span kuiTraceTitle>{{ task().title }}</span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent keepMounted>
        <div kuiTrace>
          @for (step of steps(); track step.title) {
            <span kuiTraceLine [status]="step.status">
              <span kuiTraceTitle>{{ step.title }}</span>
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class TaskRow {
  readonly task = input.required<TaskPart["data"]>()
  readonly streaming = input.required<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly steps = computed(() =>
    this.task().steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, this.streaming()),
    }))
  )
  protected readonly status = computed<Status>(() =>
    this.steps().some((step) => step.status === "error")
      ? "error"
      : this.steps().some((step) => step.status === "running")
        ? "running"
        : undefined
  )
}
