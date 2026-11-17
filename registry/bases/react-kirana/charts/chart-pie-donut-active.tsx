/**
 * Upstream's `chart-pie-donut-active`, a donut chart with an active sector, on TanStack Charts'
 * polar entry: the donut with its first slice drawn 10px further out (Recharts' `shape` for the
 * active index). Recharts' radius is 80% of the box's.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"

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
} from "../ui/chart"

export const description = "A donut chart with an active sector"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  content: css({ flex: "1 1 0%", paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[250px]`.
  chart: css({
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "250px",
  }),
  footer: css({ flexDirection: "column", gap: space[2] }),
  trend: css({
    display: "flex",
    alignItems: "center",
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

const BROWSERS = chartData.map((row) => row.browser)

// Recharts starts a pie at 3 o'clock and turns anticlockwise; TanStack Charts at 12, clockwise.
const slices = pie(chartData, {
  value: "visitors",
  startAngle: Math.PI / 2,
  endAngle: Math.PI / 2 - Math.PI * 2,
})
const ACTIVE_INDEX = 0

const chart = defineChart(
  {
    marks: [
      polar({
        // Recharts' margin, 5px on every side, is taken off before the 80%.
        inset: 5,
        radiusRatio: 0.8,
        scales: { angle: null, radius: null },
        marks: [
          radialArc(
            slices.filter((slice) => slice.sourceIndexes[0] !== ACTIVE_INDEX),
            {
              innerRadius: 60,
              color: "browser",
              key: "browser",
            }
          ),
          radialArc(
            slices.filter((slice) => slice.sourceIndexes[0] === ACTIVE_INDEX),
            {
              innerRadius: 60,
              outerRadius: ({ radius }) => radius + 10,
              color: "browser",
              key: "browser",
            }
          ),
        ],
      }),
    ],
    scales: { x: null, y: null },
    color: {
      domain: BROWSERS,
      range: BROWSERS.map((browser) => `var(--color-${browser})`),
    },
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export default function ChartPieDonutActive() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <CardTitle>Pie Chart - Donut Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Visitors by browser, January to June 2024"
          initialWidth={250}
          aspectRatio={1}
          sx={styles.chart}
          tooltip={<ChartTooltipContent hideLabel nameKey="browser" />}
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
