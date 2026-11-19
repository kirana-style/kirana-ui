import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveMonotoneX } from "d3-shape"
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
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const SERIES = ["desktop", "mobile"] as const

const rows = chartData.flatMap((row) =>
  SERIES.map((series) => ({ month: row.month, series, value: row[series] }))
)

const curve = d3Curve(curveMonotoneX)

const y = niceTicks(rows.map((row) => row.value))

const chart = defineChart(
  {
    marks: [
      lineY(rows, {
        id: "visitors",
        x: "month",
        y: "value",
        z: "series",
        curve,
        stroke: (row) => `var(--color-${row.series})`,
        strokeWidth: 2,
      }),
      // Recharts' active dot on each line at the focused month.
      whenFocused(
        dot(rows, {
          x: "month",
          y: "value",
          r: 4,
          color: "series",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      x: {
        // Recharts' category axis on a line chart: the first and last months on the plot's edges.
        scale: () => scalePoint<string>(),
        axis: {
          line: false,
          ticks: {
            size: 0,
            padding: 8,
            format: (month: string) => month.slice(0, 3),
          },
          tickLabels: { fontSize: 12 },
        },
      },
      y: {
        scale: scaleLinear().domain(y.domain),
        grid: true,
        axis: hiddenAxis(y.ticks),
      },
    },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    margin: { left: 12, right: 12 },
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)

@Component({
  selector: "chart-line-multiple",
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
        <div kuiCardTitle>Line Chart - Multiple</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent>
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Desktop and mobile visitors, January to June 2024"
          [initialWidth]="480"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent></div>
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
export default class ChartLineMultiple {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
