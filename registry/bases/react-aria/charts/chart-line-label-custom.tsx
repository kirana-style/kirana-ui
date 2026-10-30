/**
 * Upstream's `chart-line-label-custom`, a line chart with a custom label, on TanStack Charts: the
 * visitors across the browsers, each point named above it by the config's label.
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

export const description = "A line chart with a custom label"

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
      // Recharts' `dot`: a point at each value, filled in the line's colour.
      decorative(
        dot(chartData, {
          x: "browser",
          y: "visitors",
          r: 3,
          fill: "var(--color-visitors)",
          stroke: "var(--color-visitors)",
          strokeWidth: 2,
        })
      ),
      // `<LabelList dataKey="browser" />`, each browser by its config label.
      decorative(
        text(chartData, {
          x: "browser",
          y: "visitors",
          text: (row) =>
            String(chartConfig[row.browser as keyof typeof chartConfig].label),
          dy: -16,
          fill: theme.foreground,
          fontSize: 12,
        })
      ),
      // Recharts' active dot at the focused point.
      whenFocused(
        dot(chartData, {
          x: "browser",
          y: "visitors",
          r: 6,
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
    margin: { top: 24, left: 24, right: 24 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartLineLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Visitors by browser"
          initialWidth={480}
          tooltip={
            <ChartTooltipContent
              indicator="line"
              nameKey="visitors"
              hideLabel
            />
          }
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
