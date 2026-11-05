import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { barX, defineChart, text } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
  hiddenAxis,
  niceTicks,
} from "../ui/chart"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

const styles = {
  // `flex-col items-start gap-2 text-sm`.
  footer: css({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[2],
  }),
  trend: css({
    display: "flex",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart2,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
  label: {
    color: theme.background,
  },
} satisfies ChartConfig

const x = niceTicks(chartData.map((row) => row.desktop))

const chart = defineChart(
  {
    marks: [
      barX(chartData, {
        id: "desktop",
        y: "month",
        x: "desktop",
        fill: "var(--color-desktop)",
        radius: 4,
      }),
      // `<LabelList dataKey="month" position="insideLeft" offset={8} />`.
      decorative(
        text(chartData, {
          x: () => 0,
          y: "month",
          text: "month",
          anchor: "start",
          dx: 8,
          fill: "var(--color-label)",
          fontSize: 12,
        })
      ),
      // `<LabelList dataKey="desktop" position="right" offset={8} />`.
      decorative(
        text(chartData, {
          x: "desktop",
          y: "month",
          text: "desktop",
          anchor: "start",
          dx: 8,
          fill: theme.foreground,
          fontSize: 12,
        })
      ),
    ],
    scales: {
      x: {
        scale: scaleLinear().domain(x.domain),
        grid: true,
        axis: hiddenAxis(x.ticks),
      },
      y: {
        scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
        axis: false,
      },
    },
    margin: { right: 16 },
    theme: chartTheme,
  },
  { focus: "group-y", tooltip: chartTooltip }
)

@Component({
  selector: "chart-bar-label-custom",
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
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Bar Chart - Custom Label</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent>
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Desktop visitors, January to June 2024"
          [initialWidth]="480"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent indicator="line"></div>
          </ng-template>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.footer">
        <div [sx]="styles.trend">
          Trending up by 5.2% this month{{ " " }}
          <svg
            iconPlaceholder
            lucide="TrendingUpIcon"
            tabler="IconTrendingUp"
            hugeicons="ChartUpIcon"
            phosphor="TrendUpIcon"
            remixicon="RiLineChartLine"
            [sx]="styles.icon"
          ></svg>
        </div>
        <div [sx]="styles.note">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  `,
})
export default class ChartBarLabelCustom {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
