/**
 * Upstream's `chart-pie-stacked`, a pie chart with stacked sections, on TanStack Charts' polar
 * entry: the months' desktop visitors as a pie 60px across, their mobile visitors as a ring around
 * it between 70px and 90px, each month in its colour; the tooltip is headed by the ring's series.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"

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

export const description = "A pie chart with stacked sections"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  content: css({ flex: "1 1 0%", paddingBottom: 0 }),
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
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
}

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const mobileData = [
  { month: "january", mobile: 80, fill: "var(--color-january)" },
  { month: "february", mobile: 200, fill: "var(--color-february)" },
  { month: "march", mobile: 120, fill: "var(--color-march)" },
  { month: "april", mobile: 190, fill: "var(--color-april)" },
  { month: "may", mobile: 130, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: theme.chart1,
  },
  february: {
    label: "February",
    color: theme.chart2,
  },
  march: {
    label: "March",
    color: theme.chart3,
  },
  april: {
    label: "April",
    color: theme.chart4,
  },
  may: {
    label: "May",
    color: theme.chart5,
  },
} satisfies ChartConfig

const MONTHS = desktopData.map((row) => row.month)

// Recharts starts a pie at 3 o'clock and turns anticlockwise; TanStack Charts at 12, clockwise.
const angles = { startAngle: Math.PI / 2, endAngle: Math.PI / 2 - Math.PI * 2 }

const chart = defineChart(
  {
    marks: [
      polar({
        scales: { angle: null, radius: null },
        marks: [
          radialArc(pie(desktopData, { value: "desktop", ...angles }), {
            id: "desktop",
            outerRadius: 60,
            color: "month",
            key: "month",
          }),
          radialArc(pie(mobileData, { value: "mobile", ...angles }), {
            id: "mobile",
            innerRadius: 70,
            outerRadius: 90,
            color: "month",
            key: "month",
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    color: {
      domain: MONTHS,
      range: MONTHS.map((month) => `var(--color-${month})`),
    },
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export default function ChartPieStacked() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <CardTitle>Pie Chart - Stacked</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop and mobile visitors by month, January to May 2024"
          initialWidth={250}
          aspectRatio={1}
          sx={styles.chart}
          tooltip={
            <ChartTooltipContent
              labelKey="visitors"
              nameKey="month"
              indicator="line"
              // The heading is the ring's series, Desktop or Mobile.
              labelFormatter={(_, points) =>
                chartConfig[points[0]?.markId as "desktop" | "mobile"]?.label
              }
            />
          }
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
