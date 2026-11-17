/**
 * Upstream's `chart-area-stacked-expand`, a stacked area chart with expand stacking, on TanStack
 * Charts: three layers that fill each month (Recharts' `stackOffset="expand"`), other under mobile
 * under desktop. Recharts stacks the areas it draws; here each month's layers are worked out once,
 * and the tooltip reads each series' own value.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { d3Curve } from "@tanstack/charts/d3/shape"
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

export const description = "A stacked area chart with expand stacking"

const styles = {
  footer: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
  lines: css({ display: "grid", gap: space[2] }),
  trend: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80, other: 45 },
  { month: "February", desktop: 305, mobile: 200, other: 100 },
  { month: "March", desktop: 237, mobile: 120, other: 150 },
  { month: "April", desktop: 73, mobile: 190, other: 50 },
  { month: "May", desktop: 209, mobile: 130, other: 100 },
  { month: "June", desktop: 214, mobile: 140, other: 160 },
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
  other: {
    label: "Other",
    color: theme.chart3,
  },
} satisfies ChartConfig

const SERIES = ["other", "mobile", "desktop"] as const
/** Each series' layer, bottom to top as Recharts stacks the areas it draws, each month a whole. */
const layers = chartData.flatMap((row) => {
  const total = row.other + row.mobile + row.desktop
  let base = 0
  return SERIES.map((series) => {
    const y1 = base
    base += row[series] / total
    return { month: row.month, series, value: row[series], y1, y2: base }
  })
})

const curve = d3Curve(curveNatural)
const y = niceTicks(layers.map((layer) => layer.y2))

const chart = defineChart(
  {
    marks: [
      areaY(
        layers.filter((layer) => layer.series === "other"),
        {
          id: "other",
          x: "month",
          y: "value",
          y1: "y1",
          y2: "y2",
          curve,
          fill: "var(--color-other)",
          fillOpacity: 0.1,
        }
      ),
      areaY(
        layers.filter((layer) => layer.series !== "other"),
        {
          id: "visitors",
          x: "month",
          y: "value",
          y1: "y1",
          y2: "y2",
          z: "series",
          curve,
          fill: (layer) => `var(--color-${layer.series})`,
          fillOpacity: 0.4,
        }
      ),
      // Each layer's top edge, Recharts' area stroke; the tooltip reads the areas.
      decorative(
        lineY(layers, {
          x: "month",
          y: "y2",
          z: "series",
          curve,
          stroke: (layer) => `var(--color-${layer.series})`,
          strokeWidth: 1,
        })
      ),
      // Recharts' active dot on each layer at the focused month.
      whenFocused(
        dot(layers, {
          x: "month",
          y: "y2",
          r: 4,
          color: "series",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      // Recharts' category axis on an area chart: the first and last months on the plot's edges.
      x: {
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
    margin: { left: 12, right: 12, top: 12 },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them, bottom layer first.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)

export default function ChartAreaStackedExpand() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked Expanded</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and Mobile and Other visitors, January to June 2024"
          initialWidth={480}
          tooltip={<ChartTooltipContent indicator="line" />}
        />
      </CardContent>
      <CardFooter>
        <div sx={styles.footer}>
          <div sx={styles.lines}>
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
            <div sx={styles.note}>January - June 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
