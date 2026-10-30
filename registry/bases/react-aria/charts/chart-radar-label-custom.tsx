/**
 * Upstream's `chart-radar-label-custom`, a radar chart with a custom label, on TanStack Charts'
 * polar entry: each spoke labelled with its month's desktop and mobile visitors over the month's
 * name (Recharts' custom `tick`). Recharts' radius is 80% of the box's; its rings fall on the
 * radius axis' rounded ticks.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import {
  angleGrid,
  focusGroupAngle,
  polar,
  radialArea,
  radialDot,
  radialGrid,
  radialText,
} from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveLinearClosed } from "d3-shape"

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
  niceTicks,
} from "../ui/chart"

export const description = "A radar chart with a custom label"

const styles = {
  header: css({ alignItems: "center", paddingBottom: space[4] }),
  content: css({ paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[250px]`.
  chart: css({ marginInline: "auto", aspectRatio: "1", maxHeight: "250px" }),
  footer: css({ flexDirection: "column", gap: space[2] }),
  trend: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
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
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const SERIES = ["desktop", "mobile"] as const

/** Each month's value per series, a point each for the tooltip. */
const points = chartData.flatMap((row) =>
  SERIES.map((series) => ({ month: row.month, series, value: row[series] }))
)

const radius = niceTicks(chartData.flatMap((row) => [row.desktop, row.mobile]))

/** The radar's angle and radius, the same in its drawing and its points. */
const scales = {
  angle: {
    scale: scalePoint<string>().domain(chartData.map((row) => row.month)),
    wrap: true,
  },
  radius: { scale: scaleLinear().domain(radius.domain) },
}

const chart = defineChart(
  {
    marks: [
      // The drawing: in a polar container of its own, out of the tooltip's reach.
      decorative(
        polar({
          // Upstream's margin, 10px on every side, is taken off before the 80%.
          inset: 10,
          radiusRatio: 0.8,
          scales,
          // Recharts' grid in the border colour (upstream's `stroke-border`).
          guides: [
            radialGrid({
              shape: "polygon",
              values: radius.ticks.slice(1),
              stroke: theme.border,
              strokeOpacity: 1,
            }),
            angleGrid({
              labels: false,
              stroke: theme.border,
              strokeOpacity: 1,
            }),
          ],
          marks: [
            radialArea(chartData, {
              angle: "month",
              radius: "desktop",
              curve: curveLinearClosed,
              fill: "var(--color-desktop)",
              fillOpacity: 0.6,
            }),
            radialArea(chartData, {
              angle: "month",
              radius: "mobile",
              curve: curveLinearClosed,
              fill: "var(--color-mobile)",
              fillOpacity: 1,
            }),
            // Upstream's custom `tick`: the month's two values over its name, outside each spoke.
            radialText(chartData, {
              angle: "month",
              radius: () => radius.domain[1],
              radiusOffset: 18,
              dy: (row) => (row.month === "January" ? -10 : 0),
              text: (row) => `${row.desktop}/${row.mobile}`,
              anchor: "outside",
              fill: theme.foreground,
              fontSize: 13,
              fontWeight: 500,
            }),
            radialText(chartData, {
              angle: "month",
              radius: () => radius.domain[1],
              radiusOffset: 18,
              dy: (row) => (row.month === "January" ? 6 : 16),
              text: "month",
              anchor: "outside",
              fill: theme.mutedForeground,
              fontSize: 12,
            }),
          ],
        })
      ),
      // The points the tooltip reads, over it in the same place.
      polar({
        inset: 10,
        radiusRatio: 0.8,
        scales,
        marks: [
          // The tooltip's points at each month, a series each: Recharts' active dots when focused.
          radialDot(points, {
            id: "visitors",
            angle: "month",
            radius: "value",
            z: "series",
            r: 0,
            fill: (point) => `var(--color-${point.series})`,
            states: [{ when: { focus: "group" }, style: { r: 4 } }],
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    theme: chartTheme,
  },
  {
    focus: focusGroupAngle,
    tooltip: {
      ...chartTooltip,
      // Recharts lists the series in the order it draws them.
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)

export default function ChartRadarLabelCustom() {
  return (
    <Card>
      <CardHeader sx={styles.header}>
        <CardTitle>Radar Chart - Custom Label</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and Mobile visitors by month, January to June 2024"
          initialWidth={250}
          aspectRatio={1}
          sx={styles.chart}
          tooltip={<ChartTooltipContent indicator="line" />}
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
        <div sx={styles.note}>January - June 2024</div>
      </CardFooter>
    </Card>
  )
}
