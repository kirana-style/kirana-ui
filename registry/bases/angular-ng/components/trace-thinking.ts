/**
 * Trace's thinking demo's step: the reasoning as a line while it has no text, then a collapsible
 * holding it, open while it runs until the reader opens or closes it. `<kui-thinking-trace>` draws
 * no box of its own (`display: contents`), so its line or collapsible lays out as the trace's own.
 */
import { NgTemplateOutlet } from "@angular/common"
import { Component, input, signal } from "@angular/core"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/angular"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  content: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

@Component({
  selector: "kui-thinking-trace",
  imports: [
    IconPlaceholder,
    NgTemplateOutlet,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    <ng-template #line>
      <span kuiTraceLine [status]="running() ? 'running' : undefined">
        <span kuiTraceIcon>
          <svg
            iconPlaceholder
            lucide="BrainIcon"
            tabler="IconBrain"
            hugeicons="AiBrainIcon"
            phosphor="BrainIcon"
            remixicon="RiBrainLine"
          ></svg>
        </span>
        <span kuiTraceTitle>{{ running() ? "Thinking" : "Thought" }}</span>
      </span>
    </ng-template>
    @if (text().length === 0) {
      <ng-container [ngTemplateOutlet]="line" />
    } @else {
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <ng-container [ngTemplateOutlet]="line" />
        </button>
        <div kuiTraceCollapsibleContent [sx]="styles.content">{{ text() }}</div>
      </div>
    }
  `,
})
export class ThinkingTrace {
  readonly text = input.required<string>()
  readonly running = input(false)
  protected readonly styles = styles
  // Open while it runs, until the reader opens or closes it.
  protected readonly open = signal<boolean | undefined>(undefined)
}
