/**
 * Upstream's `chart-example-axis` (the Chart page's docs demo) on TanStack Charts: the chart with its grid and an x axis, each month's first three letters.
 */
import { css } from "@kirana-style/core"
import { barY, defineChart, group } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { page } from "../../../styles/page.styles"
import type { ChartConfig } from "../ui/chart"
import { ChartContainer, chartTheme, hiddenAxis, niceTicks } from "../ui/chart"

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

const chart = defineChart({
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
})

export default function ChartExampleAxis() {
  return (
    <div sx={page.example}>
      <ChartContainer
        config={chartConfig}
        definition={chart}
        ariaLabel="Desktop and mobile visitors, January to June"
        initialWidth={480}
        sx={styles.chart}
      />
    </div>
  )
}
