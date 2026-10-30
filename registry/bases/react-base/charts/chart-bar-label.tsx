/**
 * Upstream's `chart-bar-label`, a bar chart with a label, on TanStack Charts: each bar's visitors
 * written above it (Recharts' `LabelList`, a `text` mark).
 */
import { css, props as styleProps } from "@kirana-style/core"
import { barY, defineChart, text } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
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

export const description = "A bar chart with a label"

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
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

const y = niceTicks(chartData.map((row) => row.desktop))

const chart = defineChart(
  {
    marks: [
      barY(chartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        fill: "var(--color-desktop)",
        radius: 8,
      }),
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
    margin: { top: 20 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartBarLabel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop visitors, January to June 2024"
          initialWidth={480}
          tooltip={<ChartTooltipContent hideLabel />}
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
