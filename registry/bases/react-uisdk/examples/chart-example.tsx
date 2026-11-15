/**
 * Upstream's `chart-example` on TanStack Charts, each card drawn as the charts pages draw its
 * chart: `chart-area-default`, `chart-bar-multiple`, `chart-line-multiple`,
 * `chart-pie-donut-text`, `chart-radial-shape` (its radii 64px to 94px) and
 * `chart-radar-multiple`.
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
import { decorative } from "@tanstack/charts/mark/decorative"
import {
  angleGrid,
  focusGroupAngle,
  pie,
  polar,
  radialArc,
  radialArea,
  radialBarAngle,
  radialDot,
  radialGrid,
  radialText,
} from "@tanstack/charts/polar"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveLinearClosed, curveMonotoneX, curveNatural } from "d3-shape"

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
  radialBands,
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
  // The pie, radar and radial cards: `items-center pb-0` (`pb-4` on the radar's), the header a grid.
  polarHeader: css({ alignItems: "center", paddingBottom: 0 }),
  radarHeader: css({ alignItems: "center", paddingBottom: space[4] }),
  polarContent: css({ flex: "1 1 0%", paddingBottom: 0 }),
  radarContent: css({ paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[250px]`, and `max-h-[210px]` for the radial chart.
  polarChart: css({
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "250px",
  }),
  radialChart: css({
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "210px",
  }),
  // `flex-col gap-2`, centred by the footer's own `items-center`.
  polarFooter: css({ flexDirection: "column", gap: space[2] }),
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

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const pieChartConfig = {
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

const BROWSERS = pieChartData.map((row) => row.browser)
const totalVisitors = pieChartData.reduce((sum, row) => sum + row.visitors, 0)

const pieChart = defineChart(
  {
    marks: [
      polar({
        // Recharts' margin, 5px on every side, is taken off before the 80%.
        inset: 5,
        radiusRatio: 0.8,
        scales: { angle: null, radius: null },
        marks: [
          // Recharts starts a pie at 3 o'clock and turns anticlockwise; TanStack Charts at 12,
          // clockwise.
          radialArc(
            pie(pieChartData, {
              value: "visitors",
              startAngle: Math.PI / 2,
              endAngle: Math.PI / 2 - Math.PI * 2,
            }),
            { innerRadius: 60, color: "browser", key: "browser" }
          ),
        ],
      }),
      // The total in the middle, out of the tooltip's reach.
      decorative(
        polar({
          scales: {
            angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
          marks: [
            radialText([totalVisitors], {
              angle: () => 0,
              radius: () => 0,
              text: (total) => total.toLocaleString(),
              baseline: "middle",
              fill: theme.foreground,
              fontSize: 30,
              fontWeight: 700,
            }),
            radialText(["Visitors"], {
              angle: () => 0,
              radius: () => 0,
              dy: 24,
              baseline: "middle",
              fill: theme.mutedForeground,
            }),
          ],
        })
      ),
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

const radarChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const radarChartConfig = barChartConfig

/** Each month's value per series, a point each for the tooltip. */
const radarPoints = radarChartData.flatMap((row) =>
  SERIES.map((series) => ({ month: row.month, series, value: row[series] }))
)
const radarTicks = niceTicks(
  radarChartData.flatMap((row) => [row.desktop, row.mobile])
)

/** The radar's angle and radius, the same in its drawing and its points. */
const radarScales = {
  angle: {
    scale: scalePoint<string>().domain(radarChartData.map((row) => row.month)),
    wrap: true,
  },
  radius: { scale: scaleLinear().domain(radarTicks.domain) },
}

const radarChart = defineChart(
  {
    marks: [
      // The drawing: in a polar container of its own, out of the tooltip's reach.
      decorative(
        polar({
          inset: 5,
          radiusRatio: 0.8,
          scales: radarScales,
          // Recharts' grid in the border colour (upstream's `stroke-border`).
          guides: [
            radialGrid({
              shape: "polygon",
              values: radarTicks.ticks.slice(1),
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
            radialArea(radarChartData, {
              angle: "month",
              radius: "desktop",
              curve: curveLinearClosed,
              fill: "var(--color-desktop)",
              fillOpacity: 0.6,
            }),
            radialArea(radarChartData, {
              angle: "month",
              radius: "mobile",
              curve: curveLinearClosed,
              fill: "var(--color-mobile)",
              fillOpacity: 1,
            }),
          ],
        })
      ),
      // The points the tooltip reads, over it in the same place.
      polar({
        inset: 5,
        radiusRatio: 0.8,
        scales: radarScales,
        marks: [
          // The tooltip's points at each month, a series each: Recharts' active dots when focused.
          radialDot(radarPoints, {
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

const radialChartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
]

const radialChartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
} satisfies ChartConfig

const RADIAL_BROWSERS = radialChartData.map((row) => row.browser)

const radialChart = defineChart({
  marks: [
    // Upstream's two filled circles (`PolarGrid` at 86px in the muted colour, 74px in the
    // background's): a ring between them, all the way round, under the bar.
    decorative(
      polar({
        scales: { angle: null, radius: null },
        marks: [
          radialArc([{ startAngle: 0, endAngle: Math.PI * 2 }], {
            innerRadius: 74,
            outerRadius: 86,
            fill: theme.muted,
            key: () => "ring",
          }),
        ],
      })
    ),
    // Safari's visitors swept through 100° from 3 o'clock: TanStack Charts turns clockwise
    // from 12. Recharts' track (`background`) is not drawn: the bar, as long as the sweep,
    // covers it.
    polar({
      startAngle: Math.PI / 2,
      endAngle: Math.PI / 2 - (Math.PI * 100) / 180,
      scales: {
        angle: {
          scale: scaleLinear().domain([0, radialChartData[0]!.visitors]),
        },
        radius: radialBands(RADIAL_BROWSERS, 64, 94),
      },
      marks: [
        radialBarAngle(radialChartData, {
          radius: "browser",
          angle: "visitors",
          color: "browser",
          key: "browser",
        }),
      ],
    }),
    // The visitors, over the bar.
    decorative(
      polar({
        scales: {
          angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
          radius: {
            scale: scaleLinear().domain([0, 1]),
            range: [0, 1] as [number, number],
          },
        },
        marks: [
          radialText([radialChartData[0]!.visitors], {
            angle: () => 0,
            radius: () => 0,
            text: (value) => value.toLocaleString(),
            baseline: "middle",
            fill: theme.foreground,
            fontSize: 36,
            fontWeight: 700,
          }),
          radialText(["Visitors"], {
            angle: () => 0,
            radius: () => 0,
            dy: 24,
            baseline: "middle",
            fill: theme.mutedForeground,
          }),
        ],
      })
    ),
  ],
  scales: { x: null, y: null },
  color: {
    domain: RADIAL_BROWSERS,
    range: RADIAL_BROWSERS.map((browser) => `var(--color-${browser})`),
  },
  theme: chartTheme,
})

export default function ChartExample() {
  return (
    <ExampleWrapper>
      <ChartAreaExample />
      <ChartBarExample />
      <ChartLineExample />
      <ChartPieExample />
      <ChartRadialExample />
      <ChartRadarExample />
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

/** The pie, radar and radial cards' footer, as upstream's. */
function PolarFooter({ note, row }: { note: string; row?: boolean }) {
  return (
    <CardFooter sx={styles.polarFooter}>
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
      <div sx={row ? styles.noteRow : styles.note}>{note}</div>
    </CardFooter>
  )
}

function ChartPieExample() {
  return (
    <Example title="Pie Chart">
      <Card sx={styles.card}>
        <CardHeader sx={styles.polarHeader}>
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent sx={styles.polarContent}>
          <ChartContainer
            config={pieChartConfig}
            definition={pieChart}
            ariaLabel="Visitors by browser, January to June 2024"
            initialWidth={250}
            aspectRatio={1}
            sx={styles.polarChart}
            tooltip={<ChartTooltipContent hideLabel />}
          />
        </CardContent>
        <PolarFooter note="Showing total visitors for the last 6 months" />
      </Card>
    </Example>
  )
}

function ChartRadarExample() {
  return (
    <Example title="Radar Chart">
      <Card sx={styles.card}>
        <CardHeader sx={styles.radarHeader}>
          <CardTitle>Radar Chart - Multiple</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.radarContent}>
          <ChartContainer
            config={radarChartConfig}
            definition={radarChart}
            ariaLabel="Desktop and mobile visitors by month, January to June 2024"
            initialWidth={250}
            aspectRatio={1}
            sx={styles.polarChart}
            tooltip={<ChartTooltipContent indicator="line" />}
          />
        </CardContent>
        <PolarFooter note="January - June 2024" row />
      </Card>
    </Example>
  )
}

function ChartRadialExample() {
  return (
    <Example title="Radial Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Radial Chart - Shape</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent sx={styles.polarContent}>
          <ChartContainer
            config={radialChartConfig}
            definition={radialChart}
            ariaLabel="Safari visitors, January to June 2024"
            initialWidth={210}
            aspectRatio={1}
            sx={styles.radialChart}
          />
        </CardContent>
        <PolarFooter note="Showing total visitors for the last 6 months" />
      </Card>
    </Example>
  )
}
