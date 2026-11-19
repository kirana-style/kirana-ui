import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { barY, defineChart, stack } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipRow,
  niceTicks,
} from "../ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const styles = {
  // `w-[180px]`.
  tooltip: css({ width: "180px" }),
  // `h-2.5 w-2.5 shrink-0 rounded-[2px]`, in the series' colour.
  swatch: css({
    width: space["2.5"],
    height: space["2.5"],
    flexShrink: 0,
    borderRadius: "2px",
  }),
  // `ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums`.
  value: css({
    marginInlineStart: "auto",
    display: "flex",
    alignItems: "baseline",
    gap: space["0.5"],
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    fontVariantNumeric: "tabular-nums",
  }),
  // `font-normal text-muted-foreground`.
  unit: css({ fontWeight: fontWeight.normal, color: theme.mutedForeground }),
  // `mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground`.
  total: css({
    marginTop: space["1.5"],
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    paddingTop: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  }),
}

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
const totalOn = (date: string) => {
  const row = chartData.find((day) => day.date === date)!
  return row.running + row.swimming
}

@Component({
  selector: "chart-tooltip-advanced",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartTooltipRow,
    SxDirective,
  ],
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Tooltip - Advanced</div>
        <div kuiCardDescription>Tooltip with custom formatter and total.</div>
      </div>
      <div kuiCardContent>
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Running and swimming by day, 15 to 20 July 2024"
          [initialWidth]="480"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent hideLabel [sx]="styles.tooltip">
              <ng-template
                kuiChartTooltipRow
                let-value="value"
                let-name="name"
                let-index="index"
                let-datum="datum"
              >
                <div
                  [sx]="styles.swatch"
                  [style.background-color]="'var(--color-' + name + ')'"
                ></div>
                {{ labelOf(name) }}
                <div [sx]="styles.value">
                  {{ value }}
                  <span [sx]="styles.unit">kcal</span>
                </div>
                <!-- After the last row. -->
                @if (index === 1) {
                  <div [sx]="styles.total">
                    Total
                    <div [sx]="styles.value">
                      {{ totalOn(datum.date) }}
                      <span [sx]="styles.unit">kcal</span>
                    </div>
                  </div>
                }
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export default class ChartTooltipAdvanced {
  protected readonly labelOf = (name: string) =>
    chartConfig[name as keyof typeof chartConfig]?.label || name
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
  protected readonly totalOn = totalOn
}
