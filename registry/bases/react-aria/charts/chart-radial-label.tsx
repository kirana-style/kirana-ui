/**
 * Upstream's `chart-radial-label`, a radial chart with a label, on TanStack Charts' polar entry:
 * the simple radial chart swept from 6 o'clock through 470° (`startAngle={-90}`,
 * `endAngle={380}`), each bar's browser written in white along its middle, 5° past its start
 * (`position="insideStart"`). TanStack Charts writes no text along a path, so the labels are
 * Recharts' own, a `textPath` on an arc, in an SVG over the chart's centre.
 */
import * as React from "react"
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { polar, radialBarAngle } from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"

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
  radialBands,
} from "../ui/chart"

export const description = "A radial chart with a label"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`: the header is a grid, so its rows keep their width.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  content: css({ flex: "1 1 0%", paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[250px]`.
  chart: css({ marginInline: "auto", aspectRatio: "1", maxHeight: "250px" }),
  // The chart's box, holding the labels over it.
  plot: css({
    position: "relative",
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "250px",
  }),
  labels: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
    // `capitalize mix-blend-luminosity`: the labels are the config's, capitalised; white keeps
    // its lightness over any bar.
    mixBlendMode: "luminosity",
  }),
  footer: css({ flexDirection: "column", gap: space[2] }),
  trend: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
}

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: theme.chart1,
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
  firefox: {
    label: "Firefox",
    color: theme.chart3,
  },
  edge: {
    label: "Edge",
    color: theme.chart4,
  },
  other: {
    label: "Other",
    color: theme.chart5,
  },
} satisfies ChartConfig

const BROWSERS = chartData.map((row) => row.browser)
const MOST = Math.max(...chartData.map((row) => row.visitors))
const radius = radialBands(BROWSERS, 30, 110)
const bands = radius.scale().range(radius.range)

/** A point on a circle round the centre, at Recharts' angle (degrees, anticlockwise from 3). */
function point(distance: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180
  return `${distance * Math.cos(radians)},${-distance * Math.sin(radians)}`
}

/** Recharts' `insideStart` labels: round each bar's middle, from 5° past its start. */
function BarLabels() {
  const id = React.useId()
  return (
    <svg aria-hidden="true" sx={styles.labels}>
      <svg x="50%" y="50%" overflow="visible">
        {chartData.map((row) => {
          const middle = bands(row.browser)! + bands.bandwidth() / 2
          return (
            <text
              key={row.browser}
              fill="white"
              fontSize={11}
              dominantBaseline="central"
            >
              <path
                id={`${id}-${row.browser}`}
                d={`M${point(middle, -85)}A${middle},${middle},0,1,0,${point(middle, -86)}`}
                fill="none"
              />
              <textPath href={`#${id}-${row.browser}`}>
                {chartConfig[row.browser as keyof typeof chartConfig].label}
              </textPath>
            </text>
          )
        })}
      </svg>
    </svg>
  )
}

const chart = defineChart(
  {
    marks: [
      polar({
        // Recharts' sweep, from 6 o'clock anticlockwise through 470°: TanStack Charts turns
        // clockwise from 12.
        startAngle: Math.PI,
        endAngle: Math.PI / 2 - (Math.PI * 380) / 180,
        scales: {
          angle: { scale: scaleLinear().domain([0, MOST]) },
          radius,
        },
        marks: [
          // Recharts' `background`: each bar's track, the whole sweep, in the muted colour.
          radialBarAngle(chartData, {
            id: "background",
            radius: "browser",
            angle: () => MOST,
            fill: theme.muted,
            key: (row) => `${row.browser}-background`,
          }),
          radialBarAngle(chartData, {
            id: "visitors",
            radius: "browser",
            angle: "visitors",
            color: "browser",
            key: "browser",
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    color: {
      domain: BROWSERS,
      range: BROWSERS.map((browser) => `var(--color-${browser})`),
    },
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export default function ChartRadialLabel() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <CardTitle>Radial Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <div sx={styles.plot}>
          <ChartContainer
            config={chartConfig}
            definition={chart}
            ariaLabel="Visitors by browser, January to June 2024"
            initialWidth={250}
            aspectRatio={1}
            sx={styles.chart}
            tooltip={<ChartTooltipContent hideLabel nameKey="browser" />}
          />
          <BarLabels />
        </div>
      </CardContent>
      <CardFooter sx={styles.footer}>
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
        <div sx={styles.note}>Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}
