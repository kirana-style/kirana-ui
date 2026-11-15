"use client"

import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import { areaY, defineChart, lineY } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { containerSize, space } from "../../../../../core/scales"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingBottom: { '[data-size="sm"]': space["0"] },
  }),
  chartContainer: css({
    aspectRatio: "1/0.35",
  }),
}

// Monthly visitor data for the area chart.
const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: 237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: 209 },
  { month: "June", visitors: 214 },
]

// Chart configuration for the visitors dataset.
const chartConfig = {
  visitors: {
    label: "Visitors",
    color: theme.chart1,
  },
} satisfies ChartConfig

/** Recharts' `<Area type="linear">`: the area at 40%, its line over it. */
const chart = defineChart(
  {
    marks: [
      areaY(chartData, {
        id: "visitors",
        x: "month",
        y: "visitors",
        fill: "var(--color-visitors)",
        fillOpacity: 0.4,
      }),
      lineY(chartData, {
        x: "month",
        y: "visitors",
        stroke: "var(--color-visitors)",
        strokeWidth: 1,
      }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: { scale: scaleLinear, axis: false },
    },
    margin: { top: 5, right: 0, bottom: 5, left: 0 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export function AnalyticsCard() {
  return (
    <Card sx={styles.card} size="sm">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          418.2K Visitors <Badge>+10%</Badge>
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View Analytics
          </Button>
        </CardAction>
      </CardHeader>
      <ChartContainer
        config={chartConfig}
        definition={chart}
        ariaLabel="Visitors, January to June"
        initialWidth={380}
        aspectRatio={1 / 0.35}
        tooltip={<ChartTooltipContent indicator="line" hideLabel />}
        sx={styles.chartContainer}
      />
    </Card>
  )
}
