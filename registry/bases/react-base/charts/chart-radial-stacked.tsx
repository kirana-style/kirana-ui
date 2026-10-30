/**
 * Upstream's `chart-radial-stacked`, a radial chart with stacked sections, on TanStack Charts' polar entry:
 * January's mobile and desktop visitors stacked along a half ring between 83px and
 * 107px, from 3 o'clock to 9, each part with rounded ends, the total written in the middle; the
 * tooltip lists both. Recharts on upstream's site scales the angle to the larger part alone and
 * cuts the desktop part off at 9 o'clock; the half ring here is the total, as the stack means.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { polar, radialBarAngle, radialText } from "@tanstack/charts/polar"
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

export const description = "A radial chart with stacked sections"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`: the header is a grid, so its rows keep their width.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  // `flex flex-1 items-center pb-0`.
  content: css({
    display: { "*": null, base: "flex" },
    flex: { "*": null, base: "1 1 0%" },
    alignItems: { "*": null, base: "center" },
    paddingBottom: { "*": null, base: 0 },
  }),
  // `mx-auto aspect-square w-full max-w-[250px]`.
  chart: css({
    marginInline: "auto",
    aspectRatio: "1",
    width: "100%",
    maxWidth: "250px",
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

const chartData = [{ month: "january", mobile: 570, desktop: 1260 }]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const MONTHS = chartData.map((row) => row.month)
const SERIES = ["mobile", "desktop"] as const
type Series = (typeof SERIES)[number]
const totalVisitors = chartData[0].desktop + chartData[0].mobile

// Radians and pixels as they are, for what is drawn around the bars: a ring, the text in the middle.
const plain = {
  angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
  radius: {
    scale: scaleLinear().domain([0, 1]),
    range: [0, 1] as [number, number],
  },
}

// Recharts' sweep, from 3 o'clock anticlockwise to 9: TanStack Charts turns clockwise from 12.
const sweep = { startAngle: Math.PI / 2, endAngle: -Math.PI / 2 }
const scales = {
  angle: { scale: scaleLinear().domain([0, totalVisitors]) },
  radius: radialBands(MONTHS, 80, 110),
}

const chart = defineChart(
  {
    marks: [
      // The parts, drawn.
      decorative(
        polar({
          ...sweep,
          scales,
          marks: [
            radialBarAngle(chartData, {
              radius: "month",
              angle1: 0,
              angle2: "mobile",
              cornerRadius: 5,
              fill: "var(--color-mobile)",
            }),
            radialBarAngle(chartData, {
              radius: "month",
              angle1: "mobile",
              angle2: (row) => row.mobile + row.desktop,
              cornerRadius: 5,
              fill: "var(--color-desktop)",
            }),
          ],
        })
      ),
      // What the tooltip reads: each part over the whole half ring, unseen. Recharts' tooltip
      // reads the month, so wherever the pointer is on the bars it lists both parts; here both
      // are under it, and `group-y` gathers them.
      polar({
        ...sweep,
        scales,
        marks: SERIES.map((series) =>
          radialBarAngle(chartData, {
            id: series,
            radius: "month",
            angle: series,
            angle1: 0,
            angle2: () => totalVisitors,
            z: () => series,
            fillOpacity: 0,
          })
        ),
      }),
      // The total, over the bars.
      decorative(
        polar({
          scales: plain,
          marks: [
            radialText([totalVisitors], {
              angle: () => 0,
              radius: () => 0,
              text: (value) => value.toLocaleString(),
              dy: -16,
              baseline: "auto",
              fill: theme.foreground,
              fontSize: 24,
              fontWeight: 700,
            }),
            radialText(["Visitors"], {
              angle: () => 0,
              radius: () => 0,
              dy: 4,
              baseline: "auto",
              fill: theme.mutedForeground,
            }),
          ],
        })
      ),
    ],
    scales: { x: null, y: null },
    theme: chartTheme,
  },
  {
    focus: "group-y",
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.markId as Series) -
        SERIES.indexOf(right.markId as Series),
    },
  }
)

export default function ChartRadialStacked() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and mobile visitors, January to June 2024"
          initialWidth={250}
          aspectRatio={1}
          sx={styles.chart}
          tooltip={<ChartTooltipContent hideLabel />}
        />
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
