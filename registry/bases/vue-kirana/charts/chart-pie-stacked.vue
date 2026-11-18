<script setup lang="ts">
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
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
} from "../ui/chart"

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
</script>

<template>
  <Card :sx="styles.card">
    <CardHeader :sx="styles.header">
      <CardTitle> Pie Chart - Stacked </CardTitle>
      <CardDescription> January - June 2024 </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.content">
      <ChartContainer
        :config="chartConfig"
        :definition="chart"
        aria-label="Desktop and mobile visitors by month, January to May 2024"
        :initial-width="250"
        :aspect-ratio="1"
        :sx="styles.chart"
      >
        <template #tooltip>
          <ChartTooltipContent
            label-key="visitors"
            name-key="month"
            indicator="line"
            :label-formatter="
              (_, points) =>
                chartConfig[points[0]?.markId as 'desktop' | 'mobile']?.label
            "
          />
        </template>
      </ChartContainer>
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
