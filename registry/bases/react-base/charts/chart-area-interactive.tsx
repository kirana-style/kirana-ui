/**
 * Upstream's `chart-area-interactive`, an interactive area chart, on TanStack Charts: the last 90,
 * 30 or 7 days of desktop and mobile visitors, chosen in the header, stacked with each layer
 * filled by its colour fading down (upstream's `linearGradient`s, as the chart's `gradients`) and
 * its top edge a line. The chart's definition is made again when the range changes, as TanStack
 * Charts updates a chart by its definition. The dates read in UTC, where upstream's read in the
 * browser's zone, so the page prerendered on a server shows the same days.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"

import { breakpoint, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
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
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const description = "An interactive area chart"

const styles = {
  card: css({
    paddingTop: { "*": null, base: space["0"] },
  }),
  cardHeader: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: { "*": null, base: theme.border },
    paddingBlock: { "*": null, base: space[5] },
    flexDirection: { [breakpoint.sm]: "row" },
  }),
  div: css({
    display: "grid",
    flex: "1 1 0%",
    gap: space[1],
  }),
  selectTrigger: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "flex" },
    width: { "*": null, base: "160px" },
    borderRadius: { "*": null, base: radius.lg },
    marginLeft: { [breakpoint.sm]: "auto" },
  }),
  selectContent: css({
    borderRadius: { "*": null, base: radius.xl },
  }),
  selectItem: css({
    borderRadius: { "*": null, base: radius.lg },
  }),
  cardContent: css({
    paddingInline: { "*": null, base: space[2], [breakpoint.sm]: space[6] },
    paddingTop: { "*": null, base: space[4], [breakpoint.sm]: space[6] },
  }),
  chartContainer: css({
    aspectRatio: { "*": null, base: "auto" },
    height: { "*": null, base: "250px" },
    width: { "*": null, base: "100%" },
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
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const SERIES = ["mobile", "desktop"] as const

const RANGES = [
  { value: "90d", label: "Last 3 months", days: 90 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "7d", label: "Last 7 days", days: 7 },
]

const curve = d3Curve(curveNatural)

/** "Apr 1", as upstream's axis and tooltip write a day. */
function day(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

/** The chart for the days in a range: each day's layers, bottom to top as Recharts stacks them. */
function chartFor(range: string) {
  const days = RANGES.find((entry) => entry.value === range)?.days ?? 90
  const start = new Date("2024-06-30")
  start.setUTCDate(start.getUTCDate() - days)
  const layers = chartData
    .filter((row) => new Date(row.date) >= start)
    .flatMap((row) => {
      let base = 0
      return SERIES.map((series) => {
        const y1 = base
        base += row[series]
        return { date: row.date, series, value: row[series], y1, y2: base }
      })
    })
  const y = niceTicks(layers.map((layer) => layer.y2))

  return defineChart(
    {
      marks: [
        areaY(layers, {
          id: "visitors",
          x: "date",
          y: "value",
          y1: "y1",
          y2: "y2",
          z: "series",
          curve,
          fill: (layer) => `url(#chart-area-interactive-${layer.series})`,
          fillOpacity: 1,
        }),
        // Each layer's top edge, Recharts' area stroke; the tooltip reads the areas.
        decorative(
          lineY(layers, {
            x: "date",
            y: "y2",
            z: "series",
            curve,
            stroke: (layer) => `var(--color-${layer.series})`,
            strokeWidth: 1,
          })
        ),
        // Recharts' active dot on each layer at the focused day.
        whenFocused(
          dot(layers, {
            x: "date",
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
        x: {
          scale: () => scalePoint<string>(),
          axis: {
            line: false,
            ticks: { size: 0, padding: 8, format: day, count: 12 },
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
      // Upstream's `fillDesktop` and `fillMobile`: the colour from 80% down to 10%.
      gradients: SERIES.map((series) => ({
        id: `chart-area-interactive-${series}`,
        y1: 0,
        y2: 1,
        stops: [
          { offset: 0.05, color: `var(--color-${series})`, opacity: 0.8 },
          { offset: 0.95, color: `var(--color-${series})`, opacity: 0.1 },
        ],
      })),
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
          SERIES.indexOf(left.datum.series) -
          SERIES.indexOf(right.datum.series),
      },
    }
  )
}

export default function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const chart = React.useMemo(() => chartFor(timeRange), [timeRange])

  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.cardHeader}>
        <div sx={styles.div}>
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select
          items={RANGES}
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as string)}
        >
          <SelectTrigger sx={styles.selectTrigger} aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent sx={styles.selectContent}>
            {RANGES.map((range) => (
              <SelectItem
                key={range.value}
                value={range.value}
                sx={styles.selectItem}
              >
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and mobile visitors by day, April to June 2024"
          initialWidth={960}
          sx={styles.chartContainer}
          tooltip={
            <ChartTooltipContent
              labelFormatter={(value) => day(String(value))}
              indicator="dot"
            />
          }
          legend={<ChartLegendContent />}
        />
      </CardContent>
    </Card>
  )
}
