import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import {
  angleGrid,
  focusGroupAngle,
  polar,
  radialArea,
  radialDot,
  radialGrid,
} from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveLinearClosed } from "d3-shape"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
  niceTicks,
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
  header: css({ alignItems: "center", paddingBottom: space[4] }),
  content: css({ paddingBottom: 0 }),
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
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

const radius = niceTicks(chartData.map((row) => row.desktop))

const scales = {
  angle: {
    scale: scalePoint<string>().domain(chartData.map((row) => row.month)),
    wrap: true,
  },
  radius: { scale: scaleLinear().domain(radius.domain) },
}

const chart = defineChart(
  {
    marks: [
      // The drawing: in a polar container of its own, out of the tooltip's reach.
      decorative(
        polar({
          // Recharts' margin, 5px on every side, is taken off before the 80%.
          inset: 5,
          radiusRatio: 0.8,
          scales,
          // Recharts' grid in the border colour (upstream's `stroke-border`).
          guides: [
            radialGrid({
              shape: "polygon",
              values: radius.ticks.slice(1),
              stroke: theme.border,
              strokeOpacity: 1,
            }),
            angleGrid({
              labels: true,
              stroke: theme.border,
              strokeOpacity: 1,
              labelFill: theme.mutedForeground,
              labelFontSize: 12,
            }),
          ],
          marks: [
            radialArea(chartData, {
              angle: "month",
              radius: "desktop",
              curve: curveLinearClosed,
              fill: "var(--color-desktop)",
              fillOpacity: 0.6,
            }),
          ],
        })
      ),
      // The points the tooltip reads, over it in the same place.
      polar({
        inset: 5,
        radiusRatio: 0.8,
        scales,
        marks: [
          // The tooltip's point at each month, Recharts' active dot when focused.
          radialDot(chartData, {
            id: "desktop",
            angle: "month",
            radius: "desktop",
            r: 0,
            fill: "var(--color-desktop)",
            states: [{ when: { focus: "group" }, style: { r: 4 } }],
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    theme: chartTheme,
  },
  {
    focus: focusGroupAngle,
    tooltip: chartTooltip,
  }
)

@Component({
  selector: "chart-radar-default",
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
      <div kuiCardHeader [sx]="styles.header">
        <div kuiCardTitle>Radar Chart</div>
        <div kuiCardDescription>
          Showing total visitors for the last 6 months
        </div>
      </div>
      <div kuiCardContent [sx]="styles.content">
        <div
          kuiChartContainer
          [config]="chartConfig"
          [definition]="chart"
          ariaLabel="Desktop visitors by month, January to June 2024"
          [initialWidth]="250"
          [aspectRatio]="1"
          [sx]="styles.chart"
        >
          <ng-template kuiChartTooltip>
            <div kuiChartTooltipContent></div>
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
        <div [sx]="styles.note">January - June 2024</div>
      </div>
    </div>
  `,
})
export default class ChartRadarDefault {
  protected readonly styles = styles
  protected readonly chartConfig = chartConfig
  protected readonly chart = chart
}
