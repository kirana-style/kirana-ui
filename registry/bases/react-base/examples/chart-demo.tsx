import { barY, defineChart, group } from "@tanstack/charts"
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
} from "../ui/chart"

const data = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const config = {
  desktop: { label: "Desktop", color: theme.chart1 },
  mobile: { label: "Mobile", color: theme.chart2 },
} satisfies ChartConfig

const SERIES = ["desktop", "mobile"] as const

const visitors = defineChart(
  {
    marks: [
      barY(
        data.flatMap((row) =>
          SERIES.map((series) => ({
            month: row.month,
            series,
            value: row[series],
          }))
        ),
        {
          id: "visitors",
          x: "month",
          y: "value",
          color: "series",
          layout: group({ padding: 0.1 }),
          radius: 4,
        }
      ),
    ],
    scales: {
      x: {
        // Recharts' `barCategoryGap` of 10% each side and `barGap` of 4px, as band padding.
        scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
        axis: {
          line: false,
          ticks: {
            size: 0,
            padding: 10,
            format: (month: string) => month.slice(0, 3),
          },
          // The container's `text-xs`, where the library draws 10px labels.
          tickLabels: { fontSize: 12 },
        },
      },
      y: { scale: scaleLinear, grid: true, axis: false },
    },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartDemo() {
  return (
    <div sx={page.example}>
      <ChartContainer
        config={config}
        definition={visitors}
        ariaLabel="Desktop and mobile visitors, January to June"
        initialWidth={480}
        tooltip={<ChartTooltipContent />}
        legend={<ChartLegendContent />}
      />
    </div>
  )
}
