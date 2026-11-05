import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import { containerSize, space } from "@workspace/registry/core/scales"
import { Badge } from "@workspace/registry/bases/angular-ng/ui/badge"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingBottom: { '[data-size="sm"]': space["0"] },
  }),
  svg: css({
    aspectRatio: "1/0.35",
    width: "100%",
    color: theme.chart1,
  }),
}

const areaPath = "M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z"

const strokePath = "M0 52L18 40L36 46L54 70L72 50L100 49"

@Component({
  selector: "kui-analytics-card",
  imports: [
    Badge,
    Button,
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card" size="sm">
      <div kuiCardHeader>
        <div kuiCardTitle>Analytics</div>
        <div kuiCardDescription>
          418.2K Visitors
          <span kuiBadge>+10%</span>
        </div>
        <div kuiCardAction>
          <button kuiButton variant="outline" size="sm">View Analytics</button>
        </div>
      </div>
      <svg
        viewBox="0 0 100 86"
        preserveAspectRatio="none"
        [sx]="styles.svg"
        role="img"
        aria-label="Visitor trend"
      >
        <path [attr.d]="areaPath" fill="currentColor" opacity="0.28"></path>
        <path
          [attr.d]="strokePath"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        ></path>
      </svg>
    </div>
  `,
})
export class AnalyticsCard {
  protected readonly styles = styles
  protected readonly areaPath = areaPath
  protected readonly strokePath = strokePath
}
