import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  chartTheme,
  chartTooltip,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Progress } from "../../../ui/progress"

const styles = {
  // Upstream's label in the ring's middle, over the plot: no pointer, so the ring keeps its tooltip.
  centre: css({
    pointerEvents: "none",
    position: "absolute",
    insetInline: 0,
    top: 0,
    display: "flex",
    height: "160px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
  total: css({
    color: theme.foreground,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  }),
  of: css({
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  ring: css({ position: "relative" }),
  cardHeader: css({
    paddingBottom: { "*": null, base: space["0"] },
  }),
  cardContent: css({
    paddingTop: { "*": null, base: space["0"] },
  }),
  chartContainer: css({
    marginInline: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "190px",
  }),
  chartLegend: css({
    translate: { "*": null, base: `0 ${space[2]}` },
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
  // The indicator draws in `primary`, which only it reads inside the bar.
  progress: css({ [theme.primary]: theme.chart3 }),
}

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
]

const pieChartConfig = {
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
} satisfies ChartConfig

const BROWSERS = ["chrome", "safari", "firefox", "edge"] as const

const TOTAL = pieChartData.reduce((sum, row) => sum + row.visitors, 0)

const chart = defineChart(
  {
    marks: [
      polar({
        radiusRatio: 0.8,
        scales: { angle: null, radius: null },
        marks: [
          radialArc(
            pie(pieChartData, {
              value: "visitors",
              startAngle: Math.PI / 2,
              endAngle: Math.PI / 2 - Math.PI * 2,
            }),
            { color: "browser", key: "browser", innerRadius: 50 }
          ),
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

const totalVisitors = pieChartData.reduce((sum, item) => sum + item.visitors, 0)
const topBrowser = pieChartData.reduce((max, item) =>
  item.visitors > max.visitors ? item : max
)
const topBrowserShare = Math.round((topBrowser.visitors / totalVisitors) * 100)
const topBrowserLabel =
  pieChartConfig[topBrowser.browser as keyof typeof pieChartConfig]?.label ??
  "Top"

@Component({
  selector: "kui-pie-chart-card",
  imports: [
    Badge,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    Progress,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader [sx]="styles.cardHeader">
        <div kuiCardTitle>Browser Share</div>
        <div kuiCardDescription>January - June 2026</div>
        <div kuiCardAction>
          <span kuiBadge variant="outline">{{ topBrowserLabel }}</span>
        </div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.ring">
          <div
            kuiChartContainer
            [config]="pieChartConfig"
            [definition]="chart"
            [ariaLabel]="\`\${TOTAL.toLocaleString('en-US')} visitors by browser\`"
            [initialWidth]="190"
            [height]="160"
            [sx]="styles.chartContainer"
          >
            <ng-template kuiChartTooltip>
              <div kuiChartTooltipContent hideLabel nameKey="browser"></div>
            </ng-template>
            <div
              kuiChartLegendContent
              [keys]="BROWSERS"
              [sx]="styles.chartLegend"
            ></div>
          </div>
          <div [sx]="styles.centre">
            <span [sx]="styles.total">{{ TOTAL.toLocaleString("en-US") }}</span>
            <span [sx]="styles.of">Visitors</span>
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <div [sx]="styles.div">
          <span [sx]="styles.span">{{ topBrowserLabel }}</span>
          <span [sx]="styles.span2">{{ topBrowserShare }}%</span>
        </div>
        <div kuiProgress [value]="topBrowserShare" [sx]="styles.progress"></div>
      </div>
    </div>
  `,
})
export class PieChartCard {
  protected readonly styles = styles
  protected readonly pieChartConfig = pieChartConfig
  protected readonly BROWSERS = BROWSERS
  protected readonly TOTAL = TOTAL
  protected readonly chart = chart
  protected readonly topBrowserShare = topBrowserShare
  protected readonly topBrowserLabel = topBrowserLabel
}
