import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"
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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: theme.chart2,
  },
  chrome: {
    label: "Chrome",
    color: theme.chart1,
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
  firefox: {
    label: "Firefox",
    color: theme.chart3,
  },
  edge: {
    label: "Edge",
    color: theme.chart4,
  },
  other: {
    label: "Other",
    color: theme.chart5,
  },
} satisfies ChartConfig

const curve = d3Curve(curveNatural)

const y = niceTicks(chartData.map((row) => row.visitors))

const chart = defineChart(
  {
    marks: [
      lineY(chartData, {
        id: "visitors",
        x: "browser",
        y: "visitors",
        curve,
        stroke: "var(--color-visitors)",
        strokeWidth: 2,
      }),
      // Each browser's dot, in its own colour.
      decorative(
        dot(chartData, {
          x: "browser",
          y: "visitors",
          r: 5,
          color: "browser",
        })
      ),
      // Recharts' active dot at the focused point.
      whenFocused(
        dot(chartData, {
          x: "browser",
          y: "visitors",
          r: 4,
          fill: "var(--color-visitors)",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: {
        scale: scaleLinear().domain(y.domain),
        grid: true,
        axis: hiddenAxis(y.ticks),
      },
    },
    color: {
      domain: chartData.map((row) => row.browser),
      range: chartData.map((row) => row.fill),
    },
    margin: { top: 24, left: 24, right: 24 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

@Component({
  selector: "chart-line-dots-colors",
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
        <div kuiCardTitle>Line Chart - Dots Colors</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent>
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Visitors by browser"
          [initialWidth]="480"
        >
          <ng-template kuiChartTooltip>
            <div
              kuiChartTooltipContent
              indicator="line"
              nameKey="visitors"
              hideLabel
            ></div>
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
export default class ChartLineDotsColors {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
