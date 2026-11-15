/**
 * Upstream's `chart-bar-label-custom`, a bar chart with a custom label, on TanStack Charts:
 * horizontal bars with the month written inside each, in the background colour (`--color-label`),
 * and its visitors after it.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { barX, defineChart, text } from "@tanstack/charts"
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

export const description = "A bar chart with a custom label"

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

export default function ChartBarLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
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
