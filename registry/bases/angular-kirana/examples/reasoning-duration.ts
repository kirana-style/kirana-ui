import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  traceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

@Component({
  selector: "reasoning-duration",
  imports: [
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.trace">
        <div kuiTraceCollapsible>
          <button kuiTraceCollapsibleTrigger>
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
              <span kuiTraceTitle>Thought</span>
              <span kuiTraceDescription>12s</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent [sx]="styles.traceCollapsibleContent">
            {{
              "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash."
            }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ReasoningDuration {
  protected readonly styles = styles
  protected readonly page = page
}
