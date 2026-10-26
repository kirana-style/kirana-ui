/**
 * Upstream's `chart-example`, its Bar Chart only, on TanStack Charts: the area, line, pie, radar
 * and radial charts come with the rest of the charts.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { barY, defineChart, group } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Example, ExampleWrapper } from "../components/example"
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

const styles = {
  card: css({ width: "100%" }),
  footer: css({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[2],
  }),
  trend: css({
    display: "flex",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
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

const SERIES = ["desktop", "mobile"] as const

/**
 * Recharts' `<BarChart>` with two `<Bar>`s: a row per month and series, grouped within each month,
 * a horizontal grid, the months under it without their axis line or tick marks.
 */
const barChart = defineChart(
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
          radius: 4,
        }
      ),
    ],
    scales: {
      x: {
        // Recharts' `barCategoryGap` of 10% each side and `barGap` of 4px, as band padding.
        scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
        axis: {
          line: false,
          ticks: {
            size: 0,
            padding: 10,
            format: (month: string) => month.slice(0, 3),
          },
          // The container's `text-xs`, where the library draws 10px labels.
          tickLabels: { fontSize: 12 },
        },
      },
      y: { scale: scaleLinear, grid: true, axis: false },
    },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

export default function ChartExample() {
  return (
    <ExampleWrapper>
      <ChartBarExample />
    </ExampleWrapper>
  )
}

function ChartBarExample() {
  return (
    <Example title="Bar Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={barChartConfig}
            definition={barChart}
            ariaLabel="Desktop and mobile visitors, January to June 2024"
            initialWidth={480}
            tooltip={<ChartTooltipContent indicator="dashed" />}
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
          <div sx={styles.note}>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}
