"use client"

import { Card, CardContent, CardFooter } from "../../../ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import { Separator } from "../../../ui/separator"
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

const styles = {
  // Upstream's label in the ring's middle, over the plot: no pointer, so the ring keeps its tooltip.
  centre: css({
    pointerEvents: "none",
    position: "absolute",
    insetInline: 0,
    top: 0,
    display: "flex",
    height: "220px",
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
  chartContainer: css({
    marginInline: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "220px",
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space["0"] },
  }),
  div: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: space[3],
  }),
  span: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  div2: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: space[3],
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div3: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: space[3],
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
}

const chartData = [
  { name: "saved", value: 24000, fill: "var(--color-saved)" },
  { name: "remaining", value: 6000, fill: "var(--color-remaining)" },
]

const chartConfig = {
  saved: {
    label: "Saved",
    color: theme.chart2,
  },
  remaining: {
    label: "Remaining",
    color: theme.chart1,
  },
} satisfies ChartConfig

const SLICES = ["saved", "remaining"] as const

/** Recharts' `<Pie>` from 12 o'clock clockwise, 70 to 95 pixels out, its label in the middle. */
const chart = defineChart(
  {
    marks: [
      polar({
        scales: { angle: null, radius: null },
        marks: [
          radialArc(
            pie(chartData, {
              value: "value",
              startAngle: Math.PI / 2,
              endAngle: Math.PI / 2 - Math.PI * 2,
            }),
            { color: "name", key: "name", innerRadius: 70, outerRadius: 95 }
          ),
        ],
      }),
    ],
    scales: { x: null, y: null },
    color: {
      domain: SLICES,
      range: SLICES.map((slice) => `var(--color-${slice})`),
    },
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export function SavingsProgress() {
  return (
    <Card>
      <CardContent>
        <div sx={styles.ring}>
          <ChartContainer
            config={chartConfig}
            definition={chart}
            ariaLabel="$24,000 saved, 80% of $30,000"
            initialWidth={220}
            height={220}
            tooltip={<ChartTooltipContent hideLabel nameKey="name" />}
            sx={styles.chartContainer}
          />
          <div sx={styles.centre}>
            <span sx={styles.total}>$24,000</span>
            <span sx={styles.of}>80% of $30,000</span>
          </div>
        </div>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <div sx={styles.div}>
          <span sx={styles.span}>Projected Finish</span>
          <span sx={styles.span2}>October 2024</span>
        </div>
        <Separator />
        <div sx={styles.div2}>
          <span sx={styles.span3}>Monthly Average</span>
          <span sx={styles.span4}>$1,250</span>
        </div>
        <Separator />
        <div sx={styles.div3}>
          <span sx={styles.span5}>Top Contributor</span>
          <span sx={styles.span6}>Auto-Transfer</span>
        </div>
      </CardFooter>
    </Card>
  )
}
