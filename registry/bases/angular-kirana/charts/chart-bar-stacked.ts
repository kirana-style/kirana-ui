import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { barY, defineChart, stack, whenFocused } from "@tanstack/charts"
import { bandX } from "@tanstack/charts/band"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
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

const y = niceTicks(chartData.map((row) => row.desktop + row.mobile))

const order = (datum: (typeof chartData)[number] | (typeof rows)[number]) =>
  "series" in datum ? SERIES.indexOf(datum.series) : -1

const chart = defineChart(
  {
    marks: [
      // Recharts' tooltip cursor: the focused month's band, muted (upstream's `fill-muted`).
      whenFocused(bandX(chartData, { x: "month", fill: theme.muted }), {
        match: "x",
      }),
      barY(rows, {
        id: "visitors",
        x: "month",
        y: "value",
        color: "series",
        layout: stack({ order: SERIES }),
        radius: (row) =>
          row.series === "desktop" ? [0, 0, 4, 4] : [4, 4, 0, 0],
      }),
    ],
    scales: {
      x: {
        // Recharts' `barCategoryGap` of 10% each side, as band padding.
        scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
        axis: {
          line: false,
          ticks: {
            size: 0,
            padding: 10,
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
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them; the cursor's rows have none.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) => order(left.datum) - order(right.datum),
    },
  }
)

@Component({
  selector: "chart-bar-stacked",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Bar Chart - Stacked + Legend</div>
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
            <div kuiChartTooltipContent hideLabel></div>
          </ng-template>
          <div kuiChartLegendContent></div>
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
export default class ChartBarStacked {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
