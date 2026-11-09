import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  iconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  iconPlaceholder2: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

@Component({
  selector: "subagent-running",
  imports: [
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.trace">
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine status="running">
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="LoaderCircleIcon"
                  tabler="IconLoader2"
                  hugeicons="Loading03Icon"
                  phosphor="CircleNotchIcon"
                  remixicon="RiLoader4Line"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </span>
              <span kuiTraceTitle>Running the research agent</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keepMounted>
            <div kuiTrace>
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
                <span kuiTraceTitle>Ran grep -rn cacheKey scripts</span>
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
                    [sx]="styles.iconPlaceholder2"
                  ></svg>
                </span>
                <span kuiTraceTitle
                  >Running sed -n 13,15p scripts/optimize-images.ts</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SubagentRunning {
  protected readonly styles = styles
  protected readonly page = page
}
