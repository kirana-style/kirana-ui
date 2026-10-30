/**
 * Upstream's `chart-line-label`, a line chart with a label, on TanStack Charts: a dot at each
 * month with its visitors written above it (Recharts' `LabelList`, a `text` mark).
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart, dot, lineY, text, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"

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

export const description = "A line chart with a label"

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

const curve = d3Curve(curveNatural)
const y = niceTicks(chartData.map((row) => row.desktop))

const chart = defineChart(
  {
    marks: [
      lineY(chartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        curve,
        stroke: "var(--color-desktop)",
        strokeWidth: 2,
      }),
      // Recharts' `dot`: a point at each value, filled in the line's colour.
      decorative(
        dot(chartData, {
          x: "month",
          y: "desktop",
          r: 3,
          fill: "var(--color-desktop)",
          stroke: "var(--color-desktop)",
          strokeWidth: 2,
        })
      ),
      // `<LabelList position="top" offset={12} />`, in the foreground colour.
      decorative(
        text(chartData, {
          x: "month",
          y: "desktop",
          text: "desktop",
          dy: -16,
          fill: theme.foreground,
          fontSize: 12,
        })
      ),
      // Recharts' active dot at the focused point.
      whenFocused(
        dot(chartData, {
          x: "month",
          y: "desktop",
          r: 6,
          fill: "var(--color-desktop)",
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
    margin: { top: 20, left: 12, right: 12 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartLineLabel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop visitors, January to June 2024"
          initialWidth={480}
          tooltip={<ChartTooltipContent indicator="line" />}
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
