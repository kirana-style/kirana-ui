import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

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

@Component({
  selector: "chart-pie-legend",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    SxDirective,
  ],
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardHeader [sx]="styles.header">
        <div kuiCardTitle>Pie Chart - Legend</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent [sx]="styles.content">
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Visitors by browser, January to June 2024"
          [initialWidth]="250"
          [aspectRatio]="1"
          [sx]="styles.chart"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent hideLabel nameKey="browser"></div>
          </ng-template>
          <div kuiChartLegendContent [sx]="styles.legend"></div>
        </div>
      </div>
    </div>
  `,
})
export default class ChartPieLegend {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
