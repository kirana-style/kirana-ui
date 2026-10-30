"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { ChartContainer, ChartTooltipContent } from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../../../ui/item"
import { barCharts, useRoundedBars } from "./bars"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  chartContainer: css({
    display: { base: "none", [breakpoint.md]: "block" },
    height: space[8],
    width: space[24],
  }),
  span: css({
    display: { base: "none", [breakpoint.md]: "block" },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const HOLDINGS = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    data: [
      { q: "Q1", value: 380 },
      { q: "Q2", value: 420 },
      { q: "Q3", value: 390 },
      { q: "Q4", value: 652 },
    ],
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    data: [
      { q: "Q1", value: 180 },
      { q: "Q2", value: 210 },
      { q: "Q3", value: 320 },
      { q: "Q4", value: 218 },
    ],
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    data: [
      { q: "Q1", value: 60 },
      { q: "Q2", value: 70 },
      { q: "Q3", value: 120 },
      { q: "Q4", value: 90 },
    ],
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    data: [
      { q: "Q1", value: 240 },
      { q: "Q2", value: 260 },
      { q: "Q3", value: 280 },
      { q: "Q4", value: 360 },
    ],
  },
]

const miniChartConfig = {
  value: {
    label: "Dividend",
    color: theme.chart2,
  },
} satisfies ChartConfig

/** Each holding's quarters, as a chart of their own. */
const CHARTS = HOLDINGS.map((holding) =>
  barCharts(holding.data, {
    id: "value",
    x: "q",
    y: "value",
    radius: 3,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
)

export function DividendIncome() {
  const rounded = useRoundedBars()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Q2 Dividend Income</CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" sx={styles.button}>
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {HOLDINGS.map((holding, index) => (
            <Item key={holding.name} variant="muted">
              <ItemContent>
                <ItemTitle>{holding.name}</ItemTitle>
                <ItemDescription>{holding.shares}</ItemDescription>
              </ItemContent>
              <ChartContainer
                config={miniChartConfig}
                definition={
                  rounded ? CHARTS[index]!.rounded : CHARTS[index]!.square
                }
                ariaLabel={`${holding.name}, dividends by quarter`}
                initialWidth={96}
                height={32}
                tooltip={<ChartTooltipContent hideLabel />}
                sx={styles.chartContainer}
              />
              <span sx={styles.span}>{holding.amount}</span>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
