import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { IconPlaceholder } from "../../../../icons/angular"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  subagentRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

@Component({
  selector: "kui-subagent-line",
  imports: [TraceIcon, TraceLine, TraceTitle, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <span
      kuiTraceLine
      [status]="done() ? undefined : running() ? 'running' : 'error'"
    >
      <span kuiTraceIcon>
        @if (done()) {
          <svg
            iconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          ></svg>
        } @else if (running()) {
          <svg
            iconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            [sx]="styles.subagentRowIconPlaceholder"
          ></svg>
        } @else {
          <svg
            iconPlaceholder
            lucide="CircleAlertIcon"
            tabler="IconExclamationCircle"
            hugeicons="AlertCircleIcon"
            phosphor="WarningCircleIcon"
            remixicon="RiErrorWarningLine"
          ></svg>
        }
      </span>
      <span kuiTraceTitle>
        {{ done() ? "Ran" : running() ? "Running" : "Failed to run" }}
        the research subagent
      </span>
    </span>
  `,
})
export class SubagentLine {
  readonly done = input.required<boolean>()
  readonly running = input.required<boolean>()
  protected readonly styles = styles
}
