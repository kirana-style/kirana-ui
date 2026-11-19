import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
import { barCharts, useRoundedBars } from "./bars"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Progress } from "../../../ui/progress"
import { Separator } from "../../../ui/separator"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  chartContainer: css({
    height: "140px",
    width: "100%",
  }),
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span2: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span4: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    color: theme.chart1,
    fontVariantNumeric: "tabular-nums",
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[1] },
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div4: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: space[2],
  }),
  progress: css({
    flex: "1 1 0%",
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}

const chartData = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 },
]

const chartConfig = {
  usage: {
    label: "Usage (kW)",
    color: theme.chart2,
  },
} satisfies ChartConfig

const charts = barCharts(chartData, {
  id: "usage",
  x: "hour",
  y: "usage",
  radius: 4,
  axis: { tickMargin: 6 },
  margin: { top: 4, right: 0, left: 0 },
})

@Component({
  selector: "kui-power-usage",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Progress,
    Separator,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Power Usage</div>
        <div kuiCardDescription>Whole Home</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="rounded() ? charts.rounded : charts.square"
          ariaLabel="Power usage by hour"
          [initialWidth]="320"
          [height]="140"
          [sx]="styles.chartContainer"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent hideLabel></div>
          </ng-template>
        </div>
        <div kuiSeparator></div>
        <div [sx]="styles.div">
          <div [sx]="styles.div2">
            <span [sx]="styles.span">Currently Using</span>
            <span [sx]="styles.span2">3.4 kW</span>
          </div>
          <div [sx]="styles.div3">
            <span [sx]="styles.span3">Solar Gen</span>
            <span [sx]="styles.span4">+1.2 kW</span>
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <span [sx]="styles.span5">Battery Level</span>
        <div [sx]="styles.div4">
          <div kuiProgress [value]="85" [sx]="styles.progress"></div>
          <span [sx]="styles.span6">85%</span>
        </div>
      </div>
    </div>
  `,
})
export class PowerUsage {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly charts = charts
  protected readonly rounded = useRoundedBars()
}
