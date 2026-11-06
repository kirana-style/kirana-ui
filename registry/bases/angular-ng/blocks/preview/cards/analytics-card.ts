import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
import { areaY, defineChart, lineY } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { containerSize, space } from "../../../../../core/scales"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingBottom: { '[data-size="sm"]': space["0"] },
  }),
  chartContainer: css({
    aspectRatio: "1/0.35",
  }),
}

const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: 237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: 209 },
  { month: "June", visitors: 214 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: theme.chart1,
  },
} satisfies ChartConfig

const chart = defineChart(
  {
    marks: [
      areaY(chartData, {
        id: "visitors",
        x: "month",
        y: "visitors",
        fill: "var(--color-visitors)",
        fillOpacity: 0.4,
      }),
      lineY(chartData, {
        x: "month",
        y: "visitors",
        stroke: "var(--color-visitors)",
        strokeWidth: 1,
      }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: { scale: scaleLinear, axis: false },
    },
    margin: { top: 5, right: 0, bottom: 5, left: 0 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

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
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
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
      <div
        kuiChartContainer
        [config]="chartConfig"
        [definition]="chart"
        ariaLabel="Visitors, January to June"
        [initialWidth]="380"
        [aspectRatio]="1 / 0.35"
        [sx]="styles.chartContainer"
      >
        <ng-template kuiChartTooltip>
          <div kuiChartTooltipContent indicator="line" hideLabel></div>
        </ng-template>
      </div>
    </div>
  `,
})
export class AnalyticsCard {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
