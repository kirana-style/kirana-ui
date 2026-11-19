import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontWeight, leading, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Alert, AlertDescription } from "../../../ui/alert"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"

const styles = {
  // Over the secondary badge in every style, Sera's transparent one too: upstream's utilities beat
  // the badge's per-style rules.
  badge: css({
    backgroundColor: { "*": null, base: theme.chart1 },
    color: { "*": null, base: theme.chart5 },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  itemGroup: css({
    gap: { "*": null, base: space["0"] },
  }),
  item: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  itemMedia: css({
    alignSelf: { "*": null, base: "flex-start" },
  }),
  iconPlaceholder: css({
    width: space[5],
    height: space[5],
    fill: theme.primary,
    color: theme.primaryForeground,
  }),
  itemTitle: css({
    display: { "*": null, base: "inline" },
    lineHeight: { "*": null, base: leading.relaxed },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: theme.mutedForeground,
    [select.child("strong")]: {
      fontWeight: fontWeight.medium,
      color: theme.foreground,
    },
  }),
  cardFooter: css({
    justifyContent: { "*": null, base: "flex-end" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    display: { [axes.style.sera]: "none" },
  }),
  button2: css({
    width: { [axes.style.sera]: "100%" },
  }),
}

// Each feature's text as runs, the bold ones `strong`, and the badge one of them closes on.
const agentFeatures = [
  {
    id: "code-reviews",
    runs: [
      { text: "Code reviews", strong: true },
      { text: " with full codebase context to catch " },
      { text: "hard-to-find", strong: true },
      { text: " bugs." },
    ],
  },
  {
    id: "code-suggestions",
    runs: [
      { text: "Code suggestions", strong: true },
      { text: " validated in sandboxes before you merge." },
    ],
  },
  {
    id: "root-cause",
    runs: [
      { text: "Root-cause analysis", strong: true },
      { text: " for production issues with deployment context. " },
    ],
    badge: "Requires Observability Plus",
  },
]

@Component({
  selector: "kui-activate-agent-dialog",
  imports: [
    Alert,
    AlertDescription,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Item,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Ship faster & safer with Vercel Agent</div>
        <div kuiCardDescription>
          Your use is subject to Vercel's{{ " " }}
          <a href="#">Public Beta Agreement</a>
          and{{ " " }}
          <a href="#">AI Product Terms</a>
          .
        </div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div kuiItemGroup [sx]="styles.itemGroup">
          @for (feature of agentFeatures; track feature.id) {
            <div kuiItem size="xs" [sx]="styles.item">
              <div kuiItemMedia variant="icon" [sx]="styles.itemMedia">
                <svg
                  iconPlaceholder
                  lucide="CheckCircle2Icon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle02Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleLine"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </div>
              <div kuiItemContent>
                <div kuiItemTitle [sx]="styles.itemTitle">
                  @for (run of feature.runs; track index; let index = $index) {
                    @if (run.strong) {
                      <strong>{{ run.text }}</strong>
                    } @else {
                      {{ run.text }}
                    }
                  }
                  @if (feature.badge) {
                    <span kuiBadge variant="secondary" [sx]="styles.badge">{{
                      feature.badge
                    }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <div kuiAlert>
          <div kuiAlertDescription>
            Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
            activation.
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <button kuiButton variant="outline" [sx]="styles.button">Cancel</button>
        <button kuiButton [sx]="styles.button2">
          Enable with $100 credits
        </button>
      </div>
    </div>
  `,
})
export class ActivateAgentDialog {
  protected readonly styles = styles
  protected readonly agentFeatures = agentFeatures
}
