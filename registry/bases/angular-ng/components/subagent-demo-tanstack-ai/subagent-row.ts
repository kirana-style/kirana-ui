import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { AgentPart } from "./tools"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "../../ui/trace"
import { StepRow } from "./step-row"
import { SubagentLine } from "./subagent-line"

const styles = {
  subagentRowTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
}

@Component({
  selector: "kui-subagent-row",
  imports: [
    StepRow,
    SubagentLine,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (steps().length === 0) {
      <kui-subagent-line [done]="done()" [running]="running()" />
    } @else {
      <div kuiTraceCollapsible defaultOpen>
        <button kuiTraceCollapsibleTrigger>
          <kui-subagent-line [done]="done()" [running]="running()" />
        </button>
        <div
          kuiTraceCollapsibleContent
          keepMounted
          [sx]="styles.subagentRowTraceCollapsibleContent"
        >
          <div kuiTrace>
            @for (step of steps(); track step.command) {
              <kui-step-row [step]="step" />
            }
          </div>
          @if (report()) {
            <p>{{ report() }}</p>
          }
        </div>
      </div>
    }
  `,
})
export class SubagentRow {
  readonly part = input.required<AgentPart>()
  readonly streaming = input.required<boolean>()
  // A tool's output arrives once over AG-UI, so the agent's steps come with its report.
  protected readonly done = computed(() => this.part().state === "complete")
  protected readonly running = computed(
    () => !this.done() && this.part().state !== "error" && this.streaming()
  )
  protected readonly steps = computed(() => this.part().output?.steps ?? [])
  protected readonly report = computed(() => this.part().output?.report ?? "")
  protected readonly styles = styles
}
