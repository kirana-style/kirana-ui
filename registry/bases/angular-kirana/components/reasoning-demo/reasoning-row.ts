import { Component, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

const styles = {
  reasoningRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

// Open while it runs, until the reader opens or closes it.

@Component({
  selector: "kui-reasoning-row",
  imports: [
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceLine,
    TraceTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (text().length === 0) {
      <span kuiTraceLine [status]="running() ? 'running' : undefined">
        <span kuiTraceTitle>{{
          running() ? "Thinking" : "Thought for 5s"
        }}</span>
      </span>
    } @else {
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="running() ? 'running' : undefined">
            <span kuiTraceTitle>{{
              running() ? "Thinking" : "Thought for 5s"
            }}</span>
          </span>
        </button>
        <div
          kuiTraceCollapsibleContent
          [sx]="styles.reasoningRowTraceCollapsibleContent"
        >
          {{ text() }}
        </div>
      </div>
    }
  `,
})
export class ReasoningRow {
  readonly text = input.required<string>()
  readonly running = input.required<boolean>()
  readonly defaultOpen = input<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly styles = styles

  ngOnInit() {
    this.open.set(this.defaultOpen())
  }
}
