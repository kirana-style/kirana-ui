<script setup lang="ts">
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { polar, radialBarAngle } from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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
  radialBands,
} from "../ui/chart"
import BarLabels from "../components/chart-radial-label/BarLabels.vue"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`: the header is a grid, so its rows keep their width.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  content: css({ flex: "1 1 0%", paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[250px]`.
  chart: css({ marginInline: "auto", aspectRatio: "1", maxHeight: "250px" }),
  // The chart's box, holding the labels over it.
  plot: css({
    position: "relative",
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "250px",
  }),
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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
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

const BROWSERS = chartData.map((row) => row.browser)

const MOST = Math.max(...chartData.map((row) => row.visitors))

const radius = radialBands(BROWSERS, 30, 110)

const chart = defineChart(
  {
    marks: [
      polar({
        // Recharts' sweep, from 6 o'clock anticlockwise through 470°: TanStack Charts turns
        // clockwise from 12.
        startAngle: Math.PI,
        endAngle: Math.PI / 2 - (Math.PI * 380) / 180,
        scales: {
          angle: { scale: scaleLinear().domain([0, MOST]) },
          radius,
        },
        marks: [
          // Recharts' `background`: each bar's track, the whole sweep, in the muted colour.
          radialBarAngle(chartData, {
            id: "background",
            radius: "browser",
            angle: () => MOST,
            fill: theme.muted,
            key: (row) => `${row.browser}-background`,
          }),
          radialBarAngle(chartData, {
            id: "visitors",
            radius: "browser",
            angle: "visitors",
            color: "browser",
            key: "browser",
          }),
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
</script>

<template>
  <Card :sx="styles.card">
    <CardHeader :sx="styles.header">
      <CardTitle> Radial Chart - Label </CardTitle>
      <CardDescription> January - June 2024 </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.content">
      <div :sx="styles.plot">
        <ChartContainer
          :config="chartConfig"
          :definition="chart"
          aria-label="Visitors by browser, January to June 2024"
          :initial-width="250"
          :aspect-ratio="1"
          :sx="styles.chart"
        >
          <template #tooltip>
            <ChartTooltipContent hide-label name-key="browser" />
          </template>
        </ChartContainer>
        <BarLabels />
      </div>
    </CardContent>
    <CardFooter :sx="styles.footer">
      <div :sx="styles.trend">
        Trending up by 5.2% this month{{ " " }}
        <IconPlaceholder
          lucide="TrendingUpIcon"
          tabler="IconTrendingUp"
          hugeicons="ChartUpIcon"
          phosphor="TrendUpIcon"
          remixicon="RiLineChartLine"
          :sx="styles.icon"
        />
      </div>
      <div :sx="styles.note">Showing total visitors for the last 6 months</div>
    </CardFooter>
  </Card>
</template>
