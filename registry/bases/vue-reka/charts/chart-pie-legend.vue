<script setup lang="ts">
import { css, select } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../ui/chart"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  content: css({ flex: "1 1 0%", paddingBottom: 0 }),
  // `mx-auto aspect-square max-h-[300px]`.
  chart: css({
    marginInline: "auto",
    aspectRatio: "1",
    maxHeight: "300px",
  }),
  // `-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center`.
  legend: css({
    translate: `0 calc(${space[2]} * -1)`,
    flexWrap: "wrap",
    gap: space[2],
    [select.child("div")]: { flexBasis: "25%", justifyContent: "center" },
  }),
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

const slices = pie(chartData, {
  value: "visitors",
  startAngle: Math.PI / 2,
  endAngle: Math.PI / 2 - Math.PI * 2,
})

const chart = defineChart(
  {
    marks: [
      polar({
        // Recharts' margin, 5px on every side, is taken off before the 80%.
        inset: 5,
        radiusRatio: 0.8,
        scales: { angle: null, radius: null },
        marks: [
          radialArc(slices, {
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
      <CardTitle> Pie Chart - Legend </CardTitle>
      <CardDescription> January - June 2024 </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.content">
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
        <template #legend>
          <ChartLegendContent :sx="styles.legend" />
        </template>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
