import { Component, computed, input, signal } from "@angular/core"
import type { ResultPart, Status, StepPart } from "./types"
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
import { StepRow } from "./step-row"

@Component({
  selector: "kui-chain-of-thought",
  imports: [
    StatusIcon,
    StepRow,
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
    <div kuiTrace>
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="status()">
            <span kuiTraceIcon>
              <kui-status-icon [status]="status()" />
            </span>
            <span kuiTraceTitle>
              {{
                running()
                  ? "Researching"
                  : \`Researched in \${steps().length} steps\${failed() > 0 ? \`, \${failed()} failed\` : ""}\`
              }}
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent keepMounted>
          <div kuiTrace>
            @for (part of steps(); track part.id) {
              <kui-step-row
                [part]="part"
                [result]="resultOf(part)"
                [streaming]="streaming()"
              />
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChainOfThought {
  readonly steps = input.required<StepPart[]>()
  /** Each step's `tool-result` part, which carries a failed call's error (LF-039). */
  readonly results = input.required<ResultPart[]>()
  readonly streaming = input.required<boolean>()
  readonly answering = input.required<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly running = computed(
    () => this.streaming() && !this.answering()
  )
  protected readonly failed = computed(
    () => this.steps().filter((part) => part.state === "error").length
  )
  protected readonly status = computed<Status>(() =>
    this.running() ? "running" : this.failed() > 0 ? "error" : undefined
  )

  protected resultOf(part: StepPart) {
    return this.results().find((result) => result.toolCallId === part.id)
  }
}
