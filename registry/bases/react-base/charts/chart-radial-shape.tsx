/**
 * Upstream's `chart-radial-shape`, a radial chart with a custom shape, on TanStack Charts' polar entry:
 * Safari's visitors as one bar between 68px and 92px (Recharts' band from 65px to
 * 95px), swept through 100° from 3 o'clock, over a muted ring from 74px to 86px, its visitors
 * written in the middle. Recharts' track (`background`) is not drawn: the bar, as long as the
 * sweep, covers it.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import {
  polar,
  radialArc,
  radialBarAngle,
  radialText,
} from "@tanstack/charts/polar"
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
import { ChartContainer, chartTheme, radialBands } from "../ui/chart"

export const description = "A radial chart with a custom shape"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`: the header is a grid, so its rows keep their width.
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

const chartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
} satisfies ChartConfig

const BROWSERS = chartData.map((row) => row.browser)
const MOST = Math.max(...chartData.map((row) => row.visitors))

// Radians and pixels as they are, for what is drawn around the bars: a ring, the text in the middle.
const plain = {
  angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
  radius: {
    scale: scaleLinear().domain([0, 1]),
    range: [0, 1] as [number, number],
  },
}

const chart = defineChart({
  marks: [
    // The ring, under the bar.
    decorative(
      polar({
        scales: { angle: null, radius: null },
        marks: [
          // Upstream's two filled circles (`PolarGrid` at 86px in the muted colour, 74px in
          // the background's): a ring between them, all the way round.
          radialArc([{ startAngle: 0, endAngle: Math.PI * 2 }], {
            innerRadius: 74,
            outerRadius: 86,
            fill: theme.muted,
            key: () => "ring",
          }),
        ],
      })
    ),
    polar({
      startAngle: Math.PI / 2,
      endAngle: Math.PI / 2 - (Math.PI * 100) / 180,
      scales: {
        angle: { scale: scaleLinear().domain([0, MOST]) },
        radius: radialBands(BROWSERS, 65, 95),
      },
      marks: [
        radialBarAngle(chartData, {
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
        scales: plain,
        marks: [
          radialText([chartData[0].visitors], {
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
    domain: BROWSERS,
    range: BROWSERS.map((browser) => `var(--color-${browser})`),
  },
  theme: chartTheme,
})

export default function ChartRadialShape() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <CardTitle>Radial Chart - Shape</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Safari visitors, January to June 2024"
          initialWidth={250}
          aspectRatio={1}
          sx={styles.chart}
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
