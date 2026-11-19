import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { polar, radialBarAngle, radialText } from "@tanstack/charts/polar"
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

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `items-center pb-0`: the header is a grid, so its rows keep their width.
  header: css({ alignItems: "center", paddingBottom: 0 }),
  // `flex flex-1 items-center pb-0`.
  content: css({
    display: { "*": null, base: "flex" },
    flex: { "*": null, base: "1 1 0%" },
    alignItems: { "*": null, base: "center" },
    paddingBottom: { "*": null, base: 0 },
  }),
  // `mx-auto aspect-square w-full max-w-[250px]`.
  chart: css({
    marginInline: "auto",
    aspectRatio: "1",
    width: "100%",
    maxWidth: "250px",
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

const chartData = [{ month: "january", mobile: 570, desktop: 1260 }]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const MONTHS = chartData.map((row) => row.month)

const SERIES = ["mobile", "desktop"] as const

type Series = (typeof SERIES)[number]

const totalVisitors = chartData[0].desktop + chartData[0].mobile

const plain = {
  angle: { scale: scaleLinear().domain([0, Math.PI * 2]) },
  radius: {
    scale: scaleLinear().domain([0, 1]),
    range: [0, 1] as [number, number],
  },
}

const sweep = { startAngle: Math.PI / 2, endAngle: -Math.PI / 2 }

const scales = {
  angle: { scale: scaleLinear().domain([0, totalVisitors]) },
  radius: radialBands(MONTHS, 80, 110),
}

const chart = defineChart(
  {
    marks: [
      // The parts, drawn.
      decorative(
        polar({
          ...sweep,
          scales,
          marks: [
            radialBarAngle(chartData, {
              radius: "month",
              angle1: 0,
              angle2: "mobile",
              cornerRadius: 5,
              fill: "var(--color-mobile)",
            }),
            radialBarAngle(chartData, {
              radius: "month",
              angle1: "mobile",
              angle2: (row) => row.mobile + row.desktop,
              cornerRadius: 5,
              fill: "var(--color-desktop)",
            }),
          ],
        })
      ),
      // What the tooltip reads (LF-002): each part over the whole half ring, unseen. Recharts' tooltip
      // reads the month, so wherever the pointer is on the bars it lists both parts; here both
      // are under it, and `group-y` gathers them.
      polar({
        ...sweep,
        scales,
        marks: SERIES.map((series) =>
          radialBarAngle(chartData, {
            id: series,
            radius: "month",
            angle: series,
            angle1: 0,
            angle2: () => totalVisitors,
            z: () => series,
            fillOpacity: 0,
          })
        ),
      }),
      // The total, over the bars.
      decorative(
        polar({
          scales: plain,
          marks: [
            radialText([totalVisitors], {
              angle: () => 0,
              radius: () => 0,
              text: (value) => value.toLocaleString(),
              dy: -16,
              baseline: "auto",
              fill: theme.foreground,
              fontSize: 24,
              fontWeight: 700,
            }),
            radialText(["Visitors"], {
              angle: () => 0,
              radius: () => 0,
              dy: 4,
              baseline: "auto",
              fill: theme.mutedForeground,
            }),
          ],
        })
      ),
    ],
    scales: { x: null, y: null },
    theme: chartTheme,
  },
  {
    focus: "group-y",
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.markId as Series) -
        SERIES.indexOf(right.markId as Series),
    },
  }
)

@Component({
  selector: "chart-radial-stacked",
  imports: [
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
        <div kuiCardTitle>Radial Chart - Stacked</div>
        <div kuiCardDescription>January - June 2024</div>
      </div>
      <div kuiCardContent [sx]="styles.content">
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Desktop and mobile visitors, January to June 2024"
          [initialWidth]="250"
          [aspectRatio]="1"
          [sx]="styles.chart"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent hideLabel></div>
          </ng-template>
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
export default class ChartRadialStacked {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
