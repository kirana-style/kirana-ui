"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import { barY, defineChart, group } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { useRoundedBars } from "./bars"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardTitle: css({
    fontSize: { "*": null, base: fontSize.lg },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.lg,
      [axes.style.lyra]: lineHeight.lg,
      [axes.style.mira]: lineHeight.lg,
      [axes.style.luma]: lineHeight.lg,
      [axes.style.rhea]: lineHeight.lg,
      [axes.style.sera]: lineHeight.lg,
    },
  }),
  cardDescription: css({
    WebkitLineClamp: { "*": null, base: "2" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: leading.snug },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
    paddingTop: { "*": null, base: space["0"] },
  }),
  chartContainer: css({
    maxHeight: "180px",
    width: "100%",
  }),
  div: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    [select.child(":not(:last-child)")]: {
      borderInlineStartWidth: "0px",
      borderInlineEndWidth: "1px",
      borderInlineStyle: "solid",
      borderColor: `color-mix(in oklab, ${theme.border} 60%, transparent)`,
    },
  }),
  div2: css({
    paddingInline: space[2],
    textAlign: "center",
  }),
  div3: css({
    fontSize: "0.65rem",
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  div4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div5: css({
    paddingInline: space[2],
    textAlign: "center",
  }),
  div6: css({
    fontSize: "0.65rem",
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  div7: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div8: css({
    paddingInline: space[2],
    textAlign: "center",
  }),
  div9: css({
    fontSize: "0.65rem",
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  div10: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const desktopTotal = barChartData.reduce((sum, item) => sum + item.desktop, 0)
const mobileTotal = barChartData.reduce((sum, item) => sum + item.mobile, 0)
const desktopDelta = Math.round(
  ((desktopTotal - mobileTotal) / mobileTotal) * 100
)
const desktopDeltaPrefix = desktopDelta > 0 ? "+" : ""

const SERIES = ["desktop", "mobile"] as const

/** Recharts' two `<Bar>`s: a row per month and series, grouped, over a dashed grid. */
const barChart = (radius: number) =>
  defineChart(
    {
      marks: [
        barY(
          barChartData.flatMap((row) =>
            SERIES.map((series) => ({
              month: row.month,
              series,
              visitors: row[series],
            }))
          ),
          {
            id: "visitors",
            x: "month",
            y: "visitors",
            color: "series",
            layout: group({ padding: 0.1 }),
            ...(radius ? { radius: { end: radius } } : {}),
          }
        ),
      ],
      scales: {
        x: {
          scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
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
          scale: scaleLinear,
          // Recharts' `<CartesianGrid strokeDasharray="3 3">`, in the theme's grid colour.
          grid: { stroke: chartTheme.grid, strokeDasharray: "3 3" },
          axis: false,
        },
      },
      color: {
        domain: SERIES,
        range: SERIES.map((series) => `var(--color-${series})`),
      },
      // Recharts keeps room for the axis under the bars; the chart does when no bottom is given.
      margin: { top: 8, right: 0, left: 0 },
      theme: chartTheme,
    },
    { focus: "group-x", tooltip: chartTooltip }
  )
const CHARTS = { rounded: barChart(6), square: barChart(0) }

export function BarChartCard() {
  const rounded = useRoundedBars()

  return (
    <Card>
      <CardHeader>
        <CardTitle sx={styles.cardTitle}>Traffic channels</CardTitle>
        <CardDescription sx={styles.cardDescription}>
          Monthly desktop and mobile traffic for the last six months—compare
          volume and mix across platforms and devices at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer
          config={barChartConfig}
          definition={rounded ? CHARTS.rounded : CHARTS.square}
          ariaLabel="Desktop and mobile visitors, January to June"
          initialWidth={340}
          // Recharts fits the bars and their legend in the 16:9 box; here the legend stacks under
          // the plot and its axis, which take 2.4:1 so that both fit it.
          aspectRatio={2.4}
          tooltip={<ChartTooltipContent indicator="dashed" />}
          legend={<ChartLegendContent />}
          sx={styles.chartContainer}
        />
        <div sx={styles.div}>
          <div sx={styles.div2}>
            <div sx={styles.div3}>Desktop</div>
            <div sx={styles.div4}>{desktopTotal.toLocaleString()}</div>
          </div>
          <div sx={styles.div5}>
            <div sx={styles.div6}>Mobile</div>
            <div sx={styles.div7}>{mobileTotal.toLocaleString()}</div>
          </div>
          <div sx={styles.div8}>
            <div sx={styles.div9}>Mix Delta</div>
            <div sx={styles.div10}>
              {desktopDeltaPrefix}
              {desktopDelta}%
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View report</Button>
      </CardFooter>
    </Card>
  )
}
