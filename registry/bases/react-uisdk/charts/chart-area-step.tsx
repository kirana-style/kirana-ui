/**
 * Upstream's `chart-area-step`, a step area chart, on TanStack Charts: the area drawn in steps
 * (Recharts' `type="step"`, d3's `curveStep`), the tooltip without its label.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveStep } from "d3-shape"

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
  hiddenAxis,
  niceTicks,
} from "../ui/chart"

export const description = "A step area chart"

const styles = {
  footer: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
  lines: css({ display: "grid", gap: space[2] }),
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
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

/** The series' icon, for the tooltip. */
function ActivityIcon() {
  return (
    <IconPlaceholder
      lucide="ActivityIcon"
      tabler="IconActivity"
      hugeicons="Activity01Icon"
      phosphor="PulseIcon"
      remixicon="RiPulseLine"
    />
  )
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
    icon: ActivityIcon,
  },
} satisfies ChartConfig

const curve = d3Curve(curveStep)
const y = niceTicks(chartData.map((row) => row.desktop))

const chart = defineChart(
  {
    marks: [
      areaY(chartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        curve,
        fill: "var(--color-desktop)",
        fillOpacity: 0.4,
      }),
      lineY(chartData, {
        x: "month",
        y: "desktop",
        curve,
        stroke: "var(--color-desktop)",
        strokeWidth: 1,
      }),
      // Recharts' active dot at the focused month.
      whenFocused(
        dot(chartData, {
          x: "month",
          y: "desktop",
          r: 4,
          fill: "var(--color-desktop)",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      // Recharts' category axis on an area chart: the first and last months on the plot's edges.
      x: {
        scale: () => scalePoint<string>(),
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

export default function ChartAreaStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Step</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop visitors, January to June 2024"
          initialWidth={480}
          tooltip={<ChartTooltipContent hideLabel />}
        />
      </CardContent>
      <CardFooter>
        <div sx={styles.footer}>
          <div sx={styles.lines}>
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
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
