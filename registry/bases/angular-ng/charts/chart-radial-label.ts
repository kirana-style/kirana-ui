import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { polar, radialBarAngle } from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
  radialBands,
} from "../ui/chart"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { BarLabels } from "../components/chart-radial-label/bar-labels"

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

@Component({
  selector: "chart-radial-label",
  imports: [
    BarLabels,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardHeader [sx]="styles.header">
        <div kuiCardTitle>Radial Chart - Label</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent [sx]="styles.content">
        <div [sx]="styles.plot">
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
          </div>
          <kui-bar-labels />
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.footer">
        <div [sx]="styles.trend">
          Trending up by 5.2% this month{{ " " }}
          <svg
            iconPlaceholder
            lucide="TrendingUpIcon"
            tabler="IconTrendingUp"
            hugeicons="ChartUpIcon"
            phosphor="TrendUpIcon"
            remixicon="RiLineChartLine"
            [sx]="styles.icon"
          ></svg>
        </div>
        <div [sx]="styles.note">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  `,
})
export default class ChartRadialLabel {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
