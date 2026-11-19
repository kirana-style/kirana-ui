import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChartConfig } from "../../../ui/chart"
import { ChartContainer, chartTheme } from "../../../ui/chart"
import { barY, defineChart, stack } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
  chartContainer: css({
    height: { "*": null, base: space[32] },
    width: { "*": null, base: "100%" },
  }),
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: space[2],
  }),
  div2: css({
    textAlign: "center",
  }),
  div3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div4: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

const sleepChartData = [
  { hour: "10pm", deep: 0, light: 30, rem: 0 },
  { hour: "11pm", deep: 20, light: 10, rem: 0 },
  { hour: "12am", deep: 40, light: 0, rem: 10 },
  { hour: "1am", deep: 30, light: 5, rem: 15 },
  { hour: "2am", deep: 10, light: 20, rem: 30 },
  { hour: "3am", deep: 25, light: 10, rem: 20 },
  { hour: "4am", deep: 15, light: 25, rem: 10 },
  { hour: "5am", deep: 5, light: 35, rem: 15 },
  { hour: "6am", deep: 0, light: 20, rem: 25 },
]

const sleepChartConfig = {
  deep: {
    label: "Deep",
    color: theme.chart1,
  },
  light: {
    label: "Light",
    color: theme.chart2,
  },
  rem: {
    label: "REM",
    color: theme.chart3,
  },
} satisfies ChartConfig

const STAGES = ["deep", "light", "rem"] as const

const chart = defineChart({
  marks: [
    barY(
      sleepChartData.flatMap((row) =>
        STAGES.map((stage) => ({ hour: row.hour, stage, value: row[stage] }))
      ),
      {
        id: "sleep",
        x: "hour",
        y: "value",
        color: "stage",
        layout: stack({ order: STAGES }),
        maxThickness: 16,
        radius: (row) => (row.stage === "rem" ? [2, 2, 0, 0] : 0),
      }
    ),
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
      axis: false,
    },
    y: { scale: scaleLinear, axis: false },
  },
  color: {
    domain: STAGES,
    range: STAGES.map((stage) => `var(--color-${stage})`),
  },
  margin: 0,
  theme: chartTheme,
})

@Component({
  selector: "kui-sleep-report",
  imports: [
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartContainer,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Sleep Report</div>
        <div kuiCardDescription>Last night · 7h 24m</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div
          kuiChartContainer
          [config]="sleepChartConfig"
          [definition]="chart"
          ariaLabel="Sleep stages by hour"
          [initialWidth]="340"
          [height]="128"
          [sx]="styles.chartContainer"
        ></div>
        <div [sx]="styles.div">
          @for (
            s of [
              { label: "Deep", value: "2h 10m" },
              { label: "Light", value: "3h 48m" },
              { label: "REM", value: "1h 26m" },
              { label: "Score", value: "84" },
            ];
            track s.label
          ) {
            <div [sx]="styles.div2">
              <div [sx]="styles.div3">{{ s.value }}</div>
              <div [sx]="styles.div4">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>
      <div kuiCardFooter>
        <span kuiBadge variant="outline">Good</span>
        <button kuiButton variant="outline" size="sm" [sx]="styles.button">
          Details
        </button>
      </div>
    </div>
  `,
})
export class SleepReport {
  protected readonly styles = styles
  protected readonly sleepChartConfig = sleepChartConfig
  protected readonly chart = chart
}
