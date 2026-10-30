"use client"

import * as React from "react"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"

import { useIsMobile } from "../../../../../lib/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../../../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { css, select } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"

const styles = {
  chartAreaInteractiveCard: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
  }),
  chartAreaInteractiveSpan: css({
    display: { base: "none", "@container card (width >= 540px)": "block" },
  }),
  span2: css({
    display: { "@container card (width >= 540px)": "none" },
  }),
  toggleGroup: css({
    display: { base: "none", "@container card (width >= 767px)": "flex" },
  }),
  // Upstream's `*:data-[slot=toggle-group-item]:px-4!`, on each item: a style from the group
  // ranks below the item's own padding.
  toggleItem: css({ paddingInline: { "*": null, base: space[4] } }),
  selectTrigger: css({
    display: {
      "*": null,
      base: "flex",
      "@container card (width >= 767px)": "none",
    },
    width: { "*": null, base: space[40] },
    [select.descendant('[data-slot="select-value"]')]: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  }),
  selectContent: css({
    borderRadius: { "*": null, base: radius.xl },
  }),
  selectItem: css({
    borderRadius: { "*": null, base: radius.lg },
  }),
  selectItem2: css({
    borderRadius: { "*": null, base: radius.lg },
  }),
  selectItem3: css({
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

export const description = "An interactive area chart"

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
    color: theme.primary,
  },
  mobile: {
    label: "Mobile",
    color: theme.primary,
  },
} satisfies ChartConfig

const SERIES = ["mobile", "desktop"] as const

const DAYS: Record<string, number> = { "90d": 90, "30d": 30, "7d": 7 }

/** Upstream's `fillDesktop` and `fillMobile`: the colour from the top down to 10%. */
const FILL_FROM = { desktop: 1, mobile: 0.8 }

const curve = d3Curve(curveNatural)

/** "Apr 1", as upstream's axis and tooltip write a day. */
function day(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

/**
 * The chart for the days in a range, on TanStack Charts (upstream's is Recharts): each day's layers
 * stacked bottom to top as Recharts' `stackId` stacks them, each filled by its colour fading down
 * and edged by a line, the registry's `chart-area-interactive` without its legend.
 */
function chartFor(range: string) {
  const start = new Date("2024-06-30")
  start.setUTCDate(start.getUTCDate() - (DAYS[range] ?? 90))
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
          fill: (layer) => `url(#dashboard-visitors-${layer.series})`,
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
      gradients: SERIES.map((series) => ({
        id: `dashboard-visitors-${series}`,
        y1: 0,
        y2: 1,
        stops: [
          {
            offset: 0.05,
            color: `var(--color-${series})`,
            opacity: FILL_FROM[series],
          },
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

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      // oxlint-disable-next-line react/set-state-in-effect -- upstream's: a phone opens on the last 7 days.
      setTimeRange("7d")
    }
  }, [isMobile])

  const chart = React.useMemo(() => chartFor(timeRange), [timeRange])

  return (
    <Card sx={styles.chartAreaInteractiveCard}>
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span sx={styles.chartAreaInteractiveSpan}>
            Total for the last 3 months
          </span>
          <span sx={styles.span2}>Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d")
            }}
            variant="outline"
            sx={styles.toggleGroup}
          >
            <ToggleGroupItem value="90d" sx={styles.toggleItem}>
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" sx={styles.toggleItem}>
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" sx={styles.toggleItem}>
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              sx={styles.selectTrigger}
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent sx={styles.selectContent}>
              <SelectItem value="90d" sx={styles.selectItem}>
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" sx={styles.selectItem2}>
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" sx={styles.selectItem3}>
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and mobile visitors by day, April to June 2024"
          initialWidth={960}
          height={250}
          sx={styles.chartContainer}
          tooltip={
            <ChartTooltipContent
              labelFormatter={(value) => day(String(value))}
              indicator="dot"
            />
          }
        />
      </CardContent>
    </Card>
  )
}
