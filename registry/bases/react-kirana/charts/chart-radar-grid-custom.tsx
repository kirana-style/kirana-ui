/**
 * Upstream's `chart-radar-grid-custom`, a radar chart with a grid and circle fill, on TanStack
 * Charts' polar entry: a single ring at 90% of the radius and no spokes (`polarRadius={[90]}`,
 * `radialLines={false}`). Recharts' radius is 80% of the box's; its rings fall on the radius axis'
 * rounded ticks.
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

export const description = "A radar chart with a grid and circle fill"

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
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

const radius = niceTicks(chartData.map((row) => row.desktop))

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
          // Recharts' margin, 5px on every side, is taken off before the 80%.
          inset: 5,
          radiusRatio: 0.8,
          scales,
          // Recharts' grid in the border colour (upstream's `stroke-border`).
          guides: [
            radialGrid({
              shape: "polygon",
              values: [radius.domain[1] * 0.9],
              stroke: theme.border,
              strokeOpacity: 1,
            }),
            angleGrid({
              labels: true,
              strokeOpacity: 0,
              labelFill: theme.mutedForeground,
              labelFontSize: 12,
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
          ],
        })
      ),
      // The points the tooltip reads, over it in the same place.
      polar({
        inset: 5,
        radiusRatio: 0.8,
        scales,
        marks: [
          // The tooltip's point at each month, Recharts' active dot when focused.
          radialDot(chartData, {
            id: "desktop",
            angle: "month",
            radius: "desktop",
            r: 0,
            fill: "var(--color-desktop)",
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
    tooltip: chartTooltip,
  }
)

export default function ChartRadarGridCustom() {
  return (
    <Card>
      <CardHeader sx={styles.header}>
        <CardTitle>Radar Chart - Grid Custom</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop visitors by month, January to June 2024"
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
        <div sx={styles.note}>January - June 2024</div>
      </CardFooter>
    </Card>
  )
}
