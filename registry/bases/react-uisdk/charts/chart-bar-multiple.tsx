/**
 * Upstream's `chart-bar-multiple`, a multiple bar chart, on TanStack Charts: desktop and mobile
 * side by side in each month (`group()`), the tooltip's indicators dashed.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { barY, defineChart, group } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../ui/chart"

export const description = "A multiple bar chart"

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
const y = niceTicks(rows.map((row) => row.value))

const chart = defineChart(
  {
    marks: [
      barY(rows, {
        id: "visitors",
        x: "month",
        y: "value",
        color: "series",
        // Recharts' `barGap` of 4px between a month's bars.
        layout: group({ padding: 0.1 }),
        radius: 4,
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
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and mobile visitors, January to June 2024"
          initialWidth={480}
          tooltip={<ChartTooltipContent indicator="dashed" />}
        />
      </CardContent>
      <CardFooter sx={styles.footer}>
        <div sx={styles.trend}>
          Trending up by 5.2% this month{" "}
          <IconPlaceholder
            lucide="TrendingUpIcon"
            tabler="IconTrendingUp"
            hugeicons="ChartUpIcon"
            phosphor="TrendUpIcon"
            remixicon="RiLineChartLine"
            {...styleProps(styles.icon)}
          />
        </div>
        <div sx={styles.note}>Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}
