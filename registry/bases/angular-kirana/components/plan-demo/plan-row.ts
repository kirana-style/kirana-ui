import { Component, computed, input } from "@angular/core"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

@Component({
  selector: "kui-plan-row",
  imports: [
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiTraceCollapsible defaultOpen>
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="running() ? 'running' : undefined">
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="RouteIcon"
              tabler="IconRoute"
              hugeicons="Route01Icon"
              phosphor="PathIcon"
              remixicon="RiRouteLine"
            ></svg>
          </span>
          <span kuiTraceTitle>{{ plan().title }}</span>
          <span kuiTraceDescription>
            {{ done() }}
            of
            {{ plan().steps.length }}
            done
          </span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent>
        <div kuiTrace>
          @for (step of plan().steps; track step.title) {
            <span
              kuiTraceLine
              [status]="
                step.status === 'pending'
                  ? 'pending'
                  : streaming() && step.status === 'running'
                    ? 'running'
                    : undefined
              "
            >
              <span kuiTraceIcon>
                @if (step.status === "done") {
                  <svg
                    iconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
                  ></svg>
                } @else {
                  @if (step.status === "running") {
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
              <span kuiTraceTitle>{{ step.title }}</span>
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class PlanRow {
  readonly plan = input.required<Plan>()
  readonly streaming = input.required<boolean>()
  protected readonly done = computed(
    () => this.plan().steps.filter((step) => step.status === "done").length
  )
  protected readonly running = computed(
    () => this.streaming() && this.done() < this.plan().steps.length
  )
}
