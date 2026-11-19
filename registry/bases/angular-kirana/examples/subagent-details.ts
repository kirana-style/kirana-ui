import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontFamily, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Badge } from "../ui/badge"
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
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  badge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
}

@Component({
  selector: "subagent-details",
  imports: [
    Badge,
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
                  lucide="CircleCheckIcon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle01Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleFill"
                ></svg>
              </span>
              <span kuiTraceTitle>Ran the research agent</span>
              <span kuiTraceDescription>48s</span>
            </span>
          </button>
          <div
            kuiTraceCollapsibleContent
            keepMounted
            [sx]="styles.traceCollapsibleContent"
          >
            <div [sx]="styles.div">
              <span kuiBadge variant="secondary"
                >anthropic/claude-sonnet-4.5</span
              >
              <span kuiBadge variant="outline" [sx]="styles.badge"
                >runCommand</span
              >
            </div>
            <p>Find out why image optimization reruns on every deploy.</p>
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
                <span kuiTraceTitle
                  >Ran sed -n 13,15p scripts/optimize-images.ts</span
                >
              </span>
            </div>
            <p>The cache is keyed on the commit SHA.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SubagentDetails {
  protected readonly styles = styles
  protected readonly page = page
}
