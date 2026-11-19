import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveStep } from "d3-shape"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig, ChartIcon } from "../ui/chart"
import {
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
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
  footer: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
  lines: css({ display: "grid", gap: space[2] }),
  trend: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  icon: css({ width: space[4], height: space[4] }),
  note: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
}

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

/** The series' icon, for the legend. */
const ActivityIcon: ChartIcon = {
  lucide: "ActivityIcon",
  tabler: "IconActivity",
  hugeicons: "Activity01Icon",
  phosphor: "PulseIcon",
  remixicon: "RiPulseLine",
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
    icon: ActivityIcon,
  },
} satisfies ChartConfig

const curve = d3Curve(curveStep)

const y = niceTicks(chartData.map((row) => row.desktop))

const chart = defineChart(
  {
    marks: [
      areaY(chartData, {
        id: "desktop",
        x: "month",
        y: "desktop",
        curve,
        fill: "var(--color-desktop)",
        fillOpacity: 0.4,
      }),
      lineY(chartData, {
        x: "month",
        y: "desktop",
        curve,
        stroke: "var(--color-desktop)",
        strokeWidth: 1,
      }),
      // Recharts' active dot at the focused month.
      whenFocused(
        dot(chartData, {
          x: "month",
          y: "desktop",
          r: 4,
          fill: "var(--color-desktop)",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      // Recharts' category axis on an area chart: the first and last months on the plot's edges.
      x: {
        scale: () => scalePoint<string>(),
        axis: {
          line: false,
          ticks: {
            size: 0,
            padding: 8,
            format: (month: string) => month.slice(0, 3),
          },
          tickLabels: { fontSize: 12 },
        },
      },
      y: {
        scale: scaleLinear().domain(y.domain),
        grid: true,
        axis: hiddenAxis(y.ticks),
      },
    },
    margin: { left: 12, right: 12 },
    theme: chartTheme,
  },
  { focus: "group-x", tooltip: chartTooltip }
)

@Component({
  selector: "chart-area-step",
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
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Area Chart - Step</div>
        <div kuiCardDescription>
          Showing total visitors for the last 6 months
        </div>
      </div>
      <div kuiCardContent>
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Desktop visitors, January to June 2024"
          [initialWidth]="480"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent hideLabel></div>
          </ng-template>
        </div>
      </div>
      <div kuiCardFooter>
        <div [sx]="styles.footer">
          <div [sx]="styles.lines">
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
            <div [sx]="styles.note">January - June 2024</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ChartAreaStep {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
