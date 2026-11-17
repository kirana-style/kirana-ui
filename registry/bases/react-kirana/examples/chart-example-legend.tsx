/**
 * Upstream's `chart-example-legend` (the Chart page's docs demo) on TanStack Charts: the chart with its grid, its axis, its tooltip and a legend: `ChartLegendContent`.
 */
import { css } from "@kirana-style/core"
import { barY, defineChart, group, whenFocused } from "@tanstack/charts"
import { bandX } from "@tanstack/charts/band"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../ui/chart"

const styles = {
  // `min-h-[200px] w-full`.
  chart: css({ minHeight: "200px", width: "100%" }),
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
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
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
      // Recharts' tooltip cursor: the focused month's band, muted.
      whenFocused(bandX(chartData, { x: "month", fill: theme.muted }), {
        match: "x",
      }),
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

export default function ChartExampleLegend() {
  return (
    <div sx={page.example}>
      <ChartContainer
        config={chartConfig}
        definition={chart}
        ariaLabel="Desktop and mobile visitors, January to June"
        initialWidth={480}
        sx={styles.chart}
        tooltip={<ChartTooltipContent />}
        legend={<ChartLegendContent />}
      />
    </div>
  )
}
