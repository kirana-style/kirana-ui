import { Component, input } from "@angular/core"
import type { Status } from "./types"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { StatusIcon } from "./status-icon"

/** A step: a line, or a collapsible line when it has `content` to show. */

@Component({
  selector: "kui-step",
  imports: [
    StatusIcon,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    @if (content()) {
      <div kuiTraceCollapsible [defaultOpen]="defaultOpen()">
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="status()">
            <span kuiTraceIcon>
              <kui-status-icon [status]="status()" />
            </span>
            <span kuiTraceTitle>{{ title() }}</span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <ng-content />
        </div>
      </div>
    } @else {
      <span kuiTraceLine [status]="status()">
        <span kuiTraceIcon>
          <kui-status-icon [status]="status()" />
        </span>
        <span kuiTraceTitle>{{ title() }}</span>
      </span>
    }
  `,
})
export class Step {
  readonly title = input.required<string>()
  readonly status = input<Status>()
  readonly defaultOpen = input<boolean>()
  readonly content = input.required<boolean>()
}
