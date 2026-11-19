import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  animateSpin: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
}

@Component({
  selector: "trace-status",
  imports: [
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
            ></svg>
          </span>
          <span kuiTraceTitle>Ran pnpm install</span>
        </span>
        <span kuiTraceLine status="error">
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Failed to run pnpm lint</span>
        </span>
        <span kuiTraceLine status="running">
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="LoaderCircleIcon"
              tabler="IconLoader2"
              hugeicons="Loading03Icon"
              phosphor="CircleNotchIcon"
              remixicon="RiLoader4Line"
              [sx]="styles.animateSpin"
            ></svg>
          </span>
          <span kuiTraceTitle>Running pnpm build</span>
        </span>
        <span kuiTraceLine status="pending">
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CircleIcon"
              tabler="IconCircle"
              hugeicons="CircleIcon"
              phosphor="CircleIcon"
              remixicon="RiCheckboxBlankCircleLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Run pnpm test</span>
        </span>
      </div>
    </div>
  `,
})
export default class TraceStatus {
  protected readonly styles = styles
  protected readonly page = page
}
