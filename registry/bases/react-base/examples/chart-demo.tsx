/**
 * Upstream's `chart-demo`, the Chart page's first preview, on TanStack Charts: its interactive bar
 * chart (`chart-bar-interactive`) over April alone, a bar a day, desktop or mobile, chosen by the
 * header's two figures, each a button with its series' total. The chart's definition is made again when the series changes, as TanStack
 * Charts updates a chart by its definition. The dates read in UTC, where upstream's read in the
 * browser's zone, so the page prerendered on a server shows the same days.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { barY, defineChart, whenFocused } from "@tanstack/charts"
import { bandX } from "@tanstack/charts/band"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "An interactive bar chart"

const styles = {
  // `py-0 pb-4`.
  card: css({
    paddingTop: { "*": null, base: space["0"] },
    paddingBottom: { "*": null, base: space[4] },
  }),
  cardHeader: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column", [breakpoint.sm]: "row" },
    alignItems: { "*": null, base: "stretch" },
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: { "*": null, base: theme.border },
    padding: { "*": null, base: space["0"] },
  }),
  title: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "center",
    gap: space[1],
    paddingInline: space[6],
    // `pt-4 pb-3 sm:py-0!`.
    paddingTop: { base: space[4], [breakpoint.sm]: space["0"] },
    paddingBottom: { base: space[3], [breakpoint.sm]: space["0"] },
  }),
  figures: css({ display: "flex" }),
  figure: css({
    position: "relative",
    zIndex: 30,
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "center",
    gap: space[1],
    borderColor: theme.border,
    borderTopWidth: { base: "1px", [breakpoint.sm]: "0px" },
    borderLeftWidth: { ":nth-child(even)": "1px", [breakpoint.sm]: "1px" },
    paddingInline: { base: space[6], [breakpoint.sm]: space[8] },
    paddingBlock: { base: space[4], [breakpoint.sm]: space[6] },
    textAlign: "left",
    backgroundColor: {
      '[data-active="true"]': `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
    },
  }),
  label: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  total: css({
    fontSize: { base: fontSize.lg, [breakpoint.sm]: fontSize["3xl"] },
    lineHeight: "1",
    fontWeight: fontWeight.bold,
  }),
  cardContent: css({
    paddingInline: { "*": null, base: space[2], [breakpoint.sm]: space[6] },
    paddingBlock: { [breakpoint.sm]: space[6] },
  }),
  chartContainer: css({
    aspectRatio: { "*": null, base: "auto" },
    height: { "*": null, base: "250px" },
    width: { "*": null, base: "100%" },
  }),
  tooltip: css({
    width: { "*": null, base: "150px" },
  }),
}

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: theme.chart2,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart1,
  },
} satisfies ChartConfig

const SERIES = ["desktop", "mobile"] as const
type Series = (typeof SERIES)[number]

/** A day as upstream writes it: "Apr 1", or with its year in the tooltip. */
function day(date: string, year?: "numeric") {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year,
    timeZone: "UTC",
  })
}

/** The chart of one series: a bar a day. */
function chartFor(series: Series) {
  const y = niceTicks(chartData.map((row) => row[series]))
  return defineChart(
    {
      marks: [
        // Recharts' tooltip cursor: the focused day's band, muted (upstream's `fill-muted`).
        whenFocused(bandX(chartData, { x: "date", fill: theme.muted }), {
          match: "x",
        }),
        barY(chartData, {
          id: series,
          x: "date",
          y: series,
          fill: `var(--color-${series})`,
        }),
      ],
      scales: {
        x: {
          scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
          axis: {
            line: false,
            ticks: {
              size: 0,
              padding: 8,
              format: (date: string) => day(date),
              count: 12,
            },
            // Recharts' `minTickGap={32}`: labels closer than that are left out.
            tickLabels: { fontSize: 12, thin: { minGap: 32 } },
          },
        },
        y: {
          scale: scaleLinear().domain(y.domain),
          grid: true,
          axis: hiddenAxis(y.ticks),
        },
      },
      margin: { left: 12, right: 12 },
      theme: chartTheme,
    },
    { focus: "group-x", tooltip: chartTooltip }
  )
}

export default function ChartDemo() {
  const [activeChart, setActiveChart] = React.useState<Series>("desktop")
  const chart = React.useMemo(() => chartFor(activeChart), [activeChart])

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.cardHeader}>
        <div sx={styles.title}>
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div sx={styles.figures}>
          {SERIES.map((series) => (
            <button
              key={series}
              data-active={activeChart === series}
              sx={styles.figure}
              onClick={() => setActiveChart(series)}
            >
              <span sx={styles.label}>{chartConfig[series].label}</span>
              <span sx={styles.total}>{total[series].toLocaleString()}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel={`${chartConfig[activeChart].label} page views by day, April to June 2024`}
          initialWidth={960}
          height={250}
          sx={styles.chartContainer}
          tooltip={
            <ChartTooltipContent
              sx={styles.tooltip}
              nameKey="views"
              labelFormatter={(value) => day(String(value), "numeric")}
            />
          }
        />
      </CardContent>
    </Card>
  )
}
