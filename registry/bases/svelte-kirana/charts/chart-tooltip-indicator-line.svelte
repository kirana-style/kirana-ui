<script lang="ts">
  import { barY, defineChart, stack } from "@tanstack/charts"
  import { scaleBand } from "@tanstack/charts/scales/band"
  import { scaleLinear } from "@tanstack/charts/scales/linear"
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
    ChartTooltipContent,
    chartTheme,
    chartTooltip,
    niceTicks,
  } from "../ui/chart"

  const chartData = [
    { date: "2024-07-15", running: 450, swimming: 300 },
    { date: "2024-07-16", running: 380, swimming: 420 },
    { date: "2024-07-17", running: 520, swimming: 120 },
    { date: "2024-07-18", running: 140, swimming: 550 },
    { date: "2024-07-19", running: 600, swimming: 350 },
    { date: "2024-07-20", running: 480, swimming: 400 },
  ]

  const chartConfig = {
    running: {
      label: "Running",
      color: theme.chart1,
    },
    swimming: {
      label: "Swimming",
      color: theme.chart2,
    },
  } satisfies ChartConfig

  const SERIES = ["running", "swimming"] as const

  const weekday = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    })

  const y = niceTicks(chartData.map((row) => row.running + row.swimming))

  const chart = defineChart(
    {
      marks: [
        barY(
          chartData.flatMap((row) =>
            SERIES.map((series) => ({
              date: row.date,
              series,
              value: row[series],
            }))
          ),
          {
            id: "activity",
            x: "date",
            y: "value",
            color: "series",
            layout: stack({ order: SERIES }),
            radius: (row) =>
              row.series === "running" ? [0, 0, 4, 4] : [4, 4, 0, 0],
          }
        ),
      ],
      scales: {
        x: {
          scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
          axis: {
            line: false,
            ticks: { size: 0, padding: 10, format: weekday },
            tickLabels: { fontSize: 12 },
          },
        },
        y: { scale: scaleLinear().domain(y.domain), axis: false },
      },
      color: {
        domain: SERIES,
        range: SERIES.map((series) => `var(--color-${series})`),
      },
      theme: chartTheme,
    },
    {
      focus: "group-x",
      tooltip: {
        ...chartTooltip,
        // Recharts lists the series in the order it draws them.
        sort: (left, right) =>
          SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
      },
    }
  )
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Tooltip - Line Indicator
    </CardTitle>
    <CardDescription>
      Tooltip with line indicator.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig} definition={chart} ariaLabel="Running and swimming by day, 15 to 20 July 2024" initialWidth={480}>
      {#snippet tooltip()}
        <ChartTooltipContent indicator="line" />
      {/snippet}
    </ChartContainer>
  </CardContent>
</Card>
