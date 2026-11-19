import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { Part } from "./types"
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
    @if (parts().length === 0) {
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
            @for (
              agentPart of parts();
              track agentPart.type === "tool-runCommand"
                ? agentPart.toolCallId
                : undefined
            ) {
              @if (agentPart.type === "tool-runCommand") {
                <kui-step-row [part]="agentPart" [running]="running()" />
              }
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
  readonly part =
    input.required<Extract<Part, { type: "tool-researchAgent" }>>()
  readonly streaming = input.required<boolean>()
  protected readonly done = computed(() => {
    const part = this.part()
    return part.state === "output-available" && !part.preliminary
  })
  protected readonly running = computed(
    () =>
      !this.done() && this.part().state !== "output-error" && this.streaming()
  )
  protected readonly parts = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.parts : []
  })
  protected readonly report = computed(() =>
    this.parts()
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("")
  )
  protected readonly styles = styles
}
