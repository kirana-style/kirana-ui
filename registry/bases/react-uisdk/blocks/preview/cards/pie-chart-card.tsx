"use client"

import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import { Progress } from "../../../ui/progress"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  // Upstream's label in the ring's middle, over the plot: no pointer, so the ring keeps its tooltip.
  centre: css({
    pointerEvents: "none",
    position: "absolute",
    insetInline: 0,
    top: 0,
    display: "flex",
    height: "160px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  total: css({
    color: theme.foreground,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  }),
  of: css({
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  ring: css({ position: "relative" }),
  cardHeader: css({
    paddingBottom: { "*": null, base: space["0"] },
  }),
  cardContent: css({
    paddingTop: { "*": null, base: space["0"] },
  }),
  chartContainer: css({
    marginInline: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "190px",
  }),
  chartLegend: css({
    translate: { "*": null, base: `0 ${space[2]}` },
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
  // The indicator draws in `primary`, which only it reads inside the bar.
  progress: css({ [theme.primary]: theme.chart3 }),
}

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
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
} satisfies ChartConfig

const BROWSERS = ["chrome", "safari", "firefox", "edge"] as const
const TOTAL = pieChartData.reduce((sum, row) => sum + row.visitors, 0)

/** Recharts' `<Pie innerRadius={50}>` at its default 80%, the total in the middle. */
const chart = defineChart(
  {
    marks: [
      polar({
        radiusRatio: 0.8,
        scales: { angle: null, radius: null },
        marks: [
          radialArc(
            pie(pieChartData, {
              value: "visitors",
              startAngle: Math.PI / 2,
              endAngle: Math.PI / 2 - Math.PI * 2,
            }),
            { color: "browser", key: "browser", innerRadius: 50 }
          ),
        ],
      }),
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

export function PieChartCard() {
  const totalVisitors = pieChartData.reduce(
    (sum, item) => sum + item.visitors,
    0
  )
  const topBrowser = pieChartData.reduce((max, item) =>
    item.visitors > max.visitors ? item : max
  )
  const topBrowserShare = Math.round(
    (topBrowser.visitors / totalVisitors) * 100
  )
  const topBrowserLabel =
    pieChartConfig[topBrowser.browser as keyof typeof pieChartConfig]?.label ??
    "Top"

  return (
    <Card>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle>Browser Share</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
        <CardAction>
          <Badge variant="outline">{topBrowserLabel}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.ring}>
          <ChartContainer
            config={pieChartConfig}
            definition={chart}
            ariaLabel={`${TOTAL.toLocaleString("en-US")} visitors by browser`}
            initialWidth={190}
            height={160}
            tooltip={<ChartTooltipContent hideLabel nameKey="browser" />}
            legend={
              <ChartLegendContent keys={BROWSERS} sx={styles.chartLegend} />
            }
            sx={styles.chartContainer}
          />
          <div sx={styles.centre}>
            <span sx={styles.total}>{TOTAL.toLocaleString("en-US")}</span>
            <span sx={styles.of}>Visitors</span>
          </div>
        </div>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <div sx={styles.div}>
          <span sx={styles.span}>{topBrowserLabel}</span>
          <span sx={styles.span2}>{topBrowserShare}%</span>
        </div>
        <Progress value={topBrowserShare} sx={styles.progress} />
      </CardFooter>
    </Card>
  )
}
