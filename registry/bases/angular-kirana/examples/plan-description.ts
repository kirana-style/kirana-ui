import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
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
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
}

const steps = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie on the server",
  "Add a toggle to the settings page",
  "Check contrast on the charts",
]

@Component({
  selector: "plan-description",
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
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="RouteIcon"
                  tabler="IconRoute"
                  hugeicons="Route01Icon"
                  phosphor="PathIcon"
                  remixicon="RiRouteLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Plan: add dark mode</span>
              <span kuiTraceDescription>
                1 of
                {{ steps.length }}
                done
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent [sx]="styles.traceCollapsibleContent">
            <p>
              Store the theme in a cookie so the server renders the right one
              and the page does not flash on load.
            </p>
            <div kuiTrace>
              @for (step of steps; track step; let index = $index) {
                <span kuiTraceLine [status]="index > 0 ? 'pending' : undefined">
                  <span kuiTraceIcon>
                    @if (index === 0) {
                      <svg
                        iconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheckFilled"
                        hugeicons="CheckmarkCircle01Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleFill"
                      ></svg>
                    } @else {
                      <svg
                        iconPlaceholder
                        lucide="CircleIcon"
                        tabler="IconCircle"
                        hugeicons="CircleIcon"
                        phosphor="CircleIcon"
                        remixicon="RiCheckboxBlankCircleLine"
                      ></svg>
                    }
                  </span>
                  <span kuiTraceTitle>{{ step }}</span>
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class PlanDescription {
  protected readonly styles = styles
  protected readonly steps = steps
  protected readonly page = page
}
