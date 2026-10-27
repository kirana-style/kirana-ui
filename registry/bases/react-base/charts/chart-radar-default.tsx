/**
 * Upstream's `chart-radar-default`, a radar chart, on TanStack Charts' polar entry: a month per
 * spoke (`angleGrid`, its labels Recharts' `PolarAngleAxis`), polygon rings (`PolarGrid`), and the
 * visitors as a closed area at 60% opacity. Recharts' radius is 80% of the box's.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import {
  angleGrid,
  polar,
  radialArea,
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
} from "../ui/chart"

export const description = "A radar chart"

const styles = {
  // `items-center pb-4`.
  header: css({
    alignItems: "center",
    textAlign: "center",
    paddingBottom: space[4],
  }),
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

const chart = defineChart(
  {
    marks: [
      polar({
        radiusRatio: 0.8,
        scales: {
          angle: {
            scale: scalePoint<string>().domain(
              chartData.map((row) => row.month)
            ),
            wrap: true,
          },
          radius: {
            scale: scaleLinear()
              .domain([0, Math.max(...chartData.map((row) => row.desktop))])
              .nice(),
          },
        },
        // Recharts' grid lines in the border colour (upstream's `stroke-border`).
        guides: [
          radialGrid({
            shape: "polygon",
            stroke: theme.border,
            strokeOpacity: 1,
          }),
          angleGrid({
            labels: true,
            stroke: theme.border,
            strokeOpacity: 1,
            labelFill: theme.mutedForeground,
            labelFontSize: 12,
          }),
        ],
        marks: [
          radialArea(chartData, {
            id: "desktop",
            angle: "month",
            radius: "desktop",
            curve: curveLinearClosed,
            fill: "var(--color-desktop)",
            fillOpacity: 0.6,
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export default function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader sx={styles.header}>
        <CardTitle>Radar Chart</CardTitle>
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
          tooltip={<ChartTooltipContent />}
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
