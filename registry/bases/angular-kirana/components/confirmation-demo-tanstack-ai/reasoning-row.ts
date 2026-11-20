import { Component, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  reasoningRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
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
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kuiTraceCollapsible
      [open]="open() ?? running()"
      (openChange)="open.set($event)"
    >
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="running() ? 'running' : undefined">
          <span kuiTraceIcon>
            @if (running()) {
              <svg
                iconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                [sx]="styles.reasoningRowIconPlaceholder"
              ></svg>
            } @else {
              <svg
                iconPlaceholder
                lucide="CircleCheckIcon"
                tabler="IconCircleCheckFilled"
                hugeicons="CheckmarkCircle01Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleFill"
              ></svg>
            }
          </span>
          <span kuiTraceTitle>{{ running() ? "Thinking" : "Thought" }}</span>
        </span>
      </button>
      <div
        kuiTraceCollapsibleContent
        [sx]="styles.reasoningRowTraceCollapsibleContent"
      >
        {{ text() }}
      </div>
    </div>
  `,
})
export class ReasoningRow {
  readonly text = input.required<string>()
  readonly running = input.required<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly styles = styles
}
