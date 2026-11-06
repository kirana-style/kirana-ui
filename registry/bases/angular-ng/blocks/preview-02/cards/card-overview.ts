import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { barCharts } from "./bars"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "../../../ui/card"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  cardTitle: css({
    fontSize: { "*": null, base: fontSize["2xl"] },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight["2xl"],
      [axes.style.lyra]: lineHeight["2xl"],
      [axes.style.mira]: lineHeight["2xl"],
      [axes.style.luma]: lineHeight["2xl"],
      [axes.style.rhea]: lineHeight["2xl"],
      [axes.style.sera]: lineHeight["2xl"],
    },
  }),
  cardDescription: css({
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  card: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    justifyContent: { "*": null, base: "space-between" },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flex: "1 1 0%",
    flexDirection: { "*": null, base: "column" },
    justifyContent: { "*": null, base: "space-between" },
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  cardTitle2: css({
    fontSize: { "*": null, base: fontSize["2xl"] },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight["2xl"],
      [axes.style.lyra]: lineHeight["2xl"],
      [axes.style.mira]: lineHeight["2xl"],
      [axes.style.luma]: lineHeight["2xl"],
      [axes.style.rhea]: lineHeight["2xl"],
      [axes.style.sera]: lineHeight["2xl"],
    },
  }),
  button: css({
    marginTop: { "*": null, base: space[3] },
    width: { "*": null, base: "100%" },
  }),
  card2: css({
    gridColumn: { "*": null, base: "span 2 / span 2" },
  }),
  cardContent2: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  chartContainer: css({
    height: space[20],
    width: "100%",
  }),
}

const activityData = [
  { month: "Jan", amount: 40 },
  { month: "Feb", amount: 55 },
  { month: "Mar", amount: 35 },
  { month: "Apr", amount: 60 },
  { month: "May", amount: 45 },
  { month: "Jun", amount: 50 },
  { month: "Jul", amount: 65 },
  { month: "Aug", amount: 40 },
  { month: "Sep", amount: 55 },
  { month: "Oct", amount: 70 },
  { month: "Nov", amount: 45 },
  { month: "Dec", amount: 80 },
]

const chartConfig = {
  amount: {
    label: "Activity",
    color: theme.chart2,
  },
} satisfies ChartConfig

const charts = barCharts(activityData, {
  id: "amount",
  x: "month",
  y: "amount",
  radius: 3,
  axis: { tickMargin: 4, fontSize: 10, format: (month) => month.slice(0, 1) },
  margin: { top: 4, right: 0, left: 0 },
})

@Component({
  selector: "kui-card-overview",
  imports: [
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div">
      <div kuiCard>
        <div kuiCardContent>
          <div kuiCardDescription>Card Balance</div>
          <div kuiCardTitle [sx]="styles.cardTitle">US$12.94</div>
          <div kuiCardDescription [sx]="styles.cardDescription">
            US$11,337.06 Available
          </div>
        </div>
      </div>
      <div kuiCard [sx]="styles.card">
        <div kuiCardContent [sx]="styles.cardContent">
          <div [sx]="styles.div2">
            <div kuiCardDescription>Payment Due</div>
            <div kuiCardTitle [sx]="styles.cardTitle2">1 Apr</div>
          </div>
          <button kuiButton variant="outline" size="sm" [sx]="styles.button">
            Pay Early
          </button>
        </div>
      </div>
      <div kuiCard [sx]="styles.card2">
        <div kuiCardContent [sx]="styles.cardContent2">
          <div [sx]="styles.div3">
            <div kuiCardDescription>Yearly Activity</div>
            <span kuiBadge variant="secondary">+US$0.25 Daily Cash</span>
          </div>
          <div
            kuiChartContainer
            [config]="chartConfig"
            [definition]="charts.rounded"
            ariaLabel="Card activity by month"
            [initialWidth]="280"
            [height]="80"
            [sx]="styles.chartContainer"
          >
            <ng-template kuiChartTooltip>
              <div kuiChartTooltipContent hideLabel></div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CardOverview {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly charts = charts
}
