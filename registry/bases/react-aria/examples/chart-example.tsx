/**
 * Upstream's `chart-example`, its Area, Bar and Line charts, on TanStack Charts, drawn as the
 * charts pages draw `chart-area-default`, `chart-bar-multiple` and `chart-line-multiple`: the pie,
 * radar and radial charts come with the rest of the charts.
 */
import { css, props as styleProps } from "@kirana-style/core"
import {
  areaY,
  barY,
  defineChart,
  dot,
  group,
  lineY,
  whenFocused,
} from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveMonotoneX, curveNatural } from "d3-shape"

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
  hiddenAxis,
  niceTicks,
} from "../ui/chart"

const styles = {
  card: css({ width: "100%" }),
  // The area and line cards' footer: `flex w-full items-start gap-2` around a `grid gap-2`.
  footerRow: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
  lines: css({ display: "grid", gap: space[2] }),
  trendRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  noteRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
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

const areaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

/** The months on the plot's edges, as Recharts' category axis on an area or a line chart. */
const MONTH_POINT = {
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
} as const

const natural = d3Curve(curveNatural)
const areaTicks = niceTicks(areaChartData.map((row) => row.desktop))

/** Recharts' `<Area type="natural">`: an area and its top edge, a dot at the focused month. */
const areaChart = defineChart(
  {
    marks: [
      areaY(areaChartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        curve: natural,
        fill: "var(--color-desktop)",
        fillOpacity: 0.4,
      }),
      lineY(areaChartData, {
        x: "month",
        y: "desktop",
        curve: natural,
        stroke: "var(--color-desktop)",
        strokeWidth: 1,
      }),
      whenFocused(
        dot(areaChartData, {
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
      x: MONTH_POINT,
      y: {
        scale: scaleLinear().domain(areaTicks.domain),
        grid: true,
        axis: hiddenAxis(areaTicks.ticks),
      },
    },
    margin: { left: 12, right: 12 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

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
const barTicks = niceTicks(
  barChartData.flatMap((row) => SERIES.map((series) => row[series]))
)

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
      y: {
        scale: scaleLinear().domain(barTicks.domain),
        grid: true,
        axis: hiddenAxis(barTicks.ticks),
      },
    },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

const lineChartData = barChartData

const lineChartConfig = barChartConfig

const lineRows = lineChartData.flatMap((row) =>
  SERIES.map((series) => ({ month: row.month, series, value: row[series] }))
)
const lineTicks = niceTicks(lineRows.map((row) => row.value))

/** Recharts' two `<Line type="monotone">`s, a dot on each at the focused month. */
const lineChart = defineChart(
  {
    marks: [
      lineY(lineRows, {
        id: "visitors",
        x: "month",
        y: "value",
        z: "series",
        curve: d3Curve(curveMonotoneX),
        stroke: (row) => `var(--color-${row.series})`,
        strokeWidth: 2,
      }),
      whenFocused(
        dot(lineRows, {
          x: "month",
          y: "value",
          r: 4,
          color: "series",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      x: MONTH_POINT,
      y: {
        scale: scaleLinear().domain(lineTicks.domain),
        grid: true,
        axis: hiddenAxis(lineTicks.ticks),
      },
    },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    margin: { left: 12, right: 12 },
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)

export default function ChartExample() {
  return (
    <ExampleWrapper>
      <ChartAreaExample />
      <ChartBarExample />
      <ChartLineExample />
    </ExampleWrapper>
  )
}

/** The area and line cards' footer, as upstream's. */
function TrendFooter({ note }: { note: string }) {
  return (
    <CardFooter>
      <div sx={styles.footerRow}>
        <div sx={styles.lines}>
          <div sx={styles.trendRow}>
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
          <div sx={styles.noteRow}>{note}</div>
        </div>
      </div>
    </CardFooter>
  )
}

function ChartAreaExample() {
  return (
    <Example title="Area Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={areaChartConfig}
            definition={areaChart}
            ariaLabel="Desktop visitors, January to June 2024"
            initialWidth={480}
            tooltip={<ChartTooltipContent indicator="line" />}
          />
        </CardContent>
        <TrendFooter note="January - June 2024" />
      </Card>
    </Example>
  )
}

function ChartLineExample() {
  return (
    <Example title="Line Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Line Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={lineChartConfig}
            definition={lineChart}
            ariaLabel="Desktop and mobile visitors, January to June 2024"
            initialWidth={480}
            tooltip={<ChartTooltipContent />}
          />
        </CardContent>
        <TrendFooter note="Showing total visitors for the last 6 months" />
      </Card>
    </Example>
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
