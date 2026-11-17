"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { ChartContainer, ChartTooltipContent } from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import { Item, ItemContent, ItemDescription } from "../../../ui/item"
import { barCharts, useRoundedBars } from "./bars"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { font, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  chartContainer: css({
    height: "200px",
    width: "100%",
  }),
  chartTooltipContent: css({
    minWidth: { "*": null, base: space[40] },
  }),
  div: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
    gap: space[3],
  }),
  item: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent: css({
    gap: { "*": null, base: space[1] },
  }),
  itemDescription: css({
    fontSize: { "*": null, base: fontSize.xs },
    fontWeight: { "*": null, base: fontWeight.medium },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    color: theme.mutedForeground,
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  span: css({
    fontFamily: font.heading,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  item2: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent2: css({
    gap: { "*": null, base: space[1] },
  }),
  itemDescription2: css({
    fontSize: { "*": null, base: fontSize.xs },
    fontWeight: { "*": null, base: fontWeight.medium },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    color: theme.mutedForeground,
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  span3: css({
    fontFamily: font.heading,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
  span4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const chartData = [
  { month: "Dec", amount: 800 },
  { month: "Jan", amount: 1100 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1300 },
  { month: "Apr", amount: 750 },
  { month: "May", amount: 1400 },
]

const chartConfig = {
  amount: {
    label: "Contribution",
    color: theme.chart2,
  },
} satisfies ChartConfig

const charts = barCharts(chartData, {
  id: "amount",
  x: "month",
  y: "amount",
  radius: 6,
  axis: { tickMargin: 8 },
  maxThickness: 40,
  margin: { top: 8, right: 0, left: 0 },
})

export function ContributionHistory() {
  const rounded = useRoundedBars()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          definition={rounded ? charts.rounded : charts.square}
          ariaLabel="Contributions by month"
          initialWidth={320}
          height={200}
          tooltip={
            <ChartTooltipContent hideLabel sx={styles.chartTooltipContent} />
          }
          sx={styles.chartContainer}
        />
      </CardContent>
      <CardContent>
        <div sx={styles.div}>
          <Item variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <ItemDescription sx={styles.itemDescription}>
                Upcoming
              </ItemDescription>
              <span sx={styles.span}>May 25, 2024</span>
              <span sx={styles.span2}>$1,000 scheduled</span>
            </ItemContent>
          </Item>
          <Item variant="muted" sx={styles.item2}>
            <ItemContent sx={styles.itemContent2}>
              <ItemDescription sx={styles.itemDescription2}>
                Auto-Save Plan
              </ItemDescription>
              <span sx={styles.span3}>Accelerated</span>
              <span sx={styles.span4}>Recurring weekly</span>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View Full Report</Button>
      </CardFooter>
    </Card>
  )
}
