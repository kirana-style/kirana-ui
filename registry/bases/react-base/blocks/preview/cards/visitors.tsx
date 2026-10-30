"use client"

import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardContent,
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
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  card: css({
    paddingBottom: { "*": null, base: space["0"] },
  }),
  cardContent: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  chartContainer: css({
    height: space[48],
    width: "100%",
  }),
}

const areaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

const latestVisitors = areaChartData[areaChartData.length - 1]?.desktop ?? 0
const previousVisitors =
  areaChartData[areaChartData.length - 2]?.desktop ?? latestVisitors
const trendPercent =
  previousVisitors === 0
    ? 0
    : Math.round(((latestVisitors - previousVisitors) / previousVisitors) * 100)
const trendPrefix = trendPercent > 0 ? "+" : ""

const natural = d3Curve(curveNatural)

/** Recharts' `<Area type="natural">` at 15%, its line 2 pixels wide, the months' axis hidden. */
const chart = defineChart(
  {
    marks: [
      areaY(areaChartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        curve: natural,
        fill: "var(--color-desktop)",
        fillOpacity: 0.15,
      }),
      lineY(areaChartData, {
        x: "month",
        y: "desktop",
        curve: natural,
        stroke: "var(--color-desktop)",
        strokeWidth: 2,
      }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: { scale: scaleLinear, axis: false },
    },
    margin: { top: 6, right: 0, bottom: 0, left: 0 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export function Visitors() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Last 6 months </CardDescription>
        <CardAction>
          <Badge variant={trendPercent >= 0 ? "secondary" : "destructive"}>
            {trendPrefix}
            {trendPercent}% vs last month
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer
          config={areaChartConfig}
          definition={chart}
          ariaLabel="Desktop visitors, January to June"
          initialWidth={340}
          height={192}
          tooltip={<ChartTooltipContent indicator="line" />}
          sx={styles.chartContainer}
        />
      </CardContent>
    </Card>
  )
}
