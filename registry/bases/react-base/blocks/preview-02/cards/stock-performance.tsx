"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../../../ui/chart"
import type { ChartConfig } from "../../../ui/chart"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../ui/combobox"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Separator } from "../../../ui/separator"
import { areaY, defineChart, lineY } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveMonotoneX } from "d3-shape"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  separator: css({
    display: { [axes.style.sera]: "none" },
  }),
  chartContainer: css({
    height: "200px",
    width: "100%",
  }),
}

const TICKERS = ["VOO", "VIG", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]

const CHART_DATA: Record<string, { month: string; price: number }[]> = {
  VOO: [
    { month: "Jan", price: 412 },
    { month: "Feb", price: 438 },
    { month: "Mar", price: 395 },
    { month: "Apr", price: 450 },
    { month: "May", price: 420 },
    { month: "Jun", price: 462 },
  ],
  AAPL: [
    { month: "Jan", price: 185 },
    { month: "Feb", price: 210 },
    { month: "Mar", price: 172 },
    { month: "Apr", price: 198 },
    { month: "May", price: 178 },
    { month: "Jun", price: 215 },
  ],
}

const DEFAULT_DATA = [
  { month: "Jan", price: 100 },
  { month: "Feb", price: 118 },
  { month: "Mar", price: 95 },
  { month: "Apr", price: 125 },
  { month: "May", price: 108 },
  { month: "Jun", price: 130 },
]

const chartConfig = {
  price: {
    label: "Price",
    color: theme.chart1,
  },
} satisfies ChartConfig

/** Recharts' `type="monotone"`. */
const monotoneX = d3Curve(curveMonotoneX)

/** A ticker's months: an area to the line, its fill fading down (upstream's `fillPrice`). */
const priceChart = (data: readonly { month: string; price: number }[]) =>
  defineChart(
    {
      marks: [
        areaY(data, {
          id: "price",
          x: "month",
          y: "price",
          curve: monotoneX,
          fill: "url(#fillPrice)",
        }),
        lineY(data, {
          x: "month",
          y: "price",
          curve: monotoneX,
          stroke: "var(--color-price)",
          strokeWidth: 2,
        }),
      ],
      gradients: [
        {
          id: "fillPrice",
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          stops: [
            { offset: 0, color: "var(--color-price)", opacity: 0.3 },
            { offset: 1, color: "var(--color-price)", opacity: 0.05 },
          ],
        },
      ],
      scales: {
        x: { scale: () => scalePoint<string>(), axis: false },
        y: {
          scale: scaleLinear,
          // Recharts' `<CartesianGrid strokeDasharray="3 3">`, in the theme's grid colour.
          grid: { stroke: chartTheme.grid, strokeDasharray: "3 3" },
          axis: false,
        },
      },
      margin: { top: 8, right: 0, bottom: 0, left: 0 },
      theme: chartTheme,
    },
    { focus: "group-x", tooltip: chartTooltip }
  )

const CHARTS = Object.fromEntries(
  Object.entries(CHART_DATA).map(([ticker, data]) => [ticker, priceChart(data)])
)
const DEFAULT_CHART = priceChart(DEFAULT_DATA)

export function StockPerformance() {
  const [ticker, setTicker] = React.useState("VOO")

  const chart = CHARTS[ticker] ?? DEFAULT_CHART

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Performance</CardTitle>
        <CardDescription>6-month price history.</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ticker-select">Ticker</FieldLabel>
            <Combobox
              items={TICKERS}
              value={ticker}
              onValueChange={(value) => {
                if (value !== null) setTicker(value)
              }}
            >
              <ComboboxInput
                id="ticker-select"
                placeholder="Search ticker..."
              />
              <ComboboxContent>
                <ComboboxEmpty>No tickers found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </FieldGroup>
        <Separator sx={styles.separator} />
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel={`${ticker}, price by month`}
          initialWidth={320}
          height={200}
          tooltip={<ChartTooltipContent hideLabel />}
          sx={styles.chartContainer}
        />
      </CardContent>
    </Card>
  )
}
