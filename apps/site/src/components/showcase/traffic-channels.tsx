/** Upstream's `preview` block's bar chart card, on TanStack Charts as the registry's `chart-example` writes it. */
import { css } from "@kirana-style/core"
import { barY, defineChart, group } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { usePageDesign } from "@/lib/page-design"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import type { ChartConfig } from "@workspace/registry/bases/react-base/ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "@workspace/registry/bases/react-base/ui/chart"
import { shared } from "./shared"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  chartTitle: css({ fontSize: fontSize.lg, lineHeight: lineHeight.lg }),
  clamp: css({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    fontSize: fontSize.sm,
    lineHeight: "1.375",
  }),
  noTop: css({ paddingTop: 0 }),
  totals: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  }),
  total: css({
    paddingInline: space[2],
    textAlign: "center",
    borderInlineStartWidth: { base: "1px", ":first-child": 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: alpha.border50,
  }),
  totalLabel: css({
    fontSize: "0.65rem",
    textTransform: "uppercase",
    color: theme.mutedForeground,
  }),
  figure: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}

const traffic = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const trafficConfig = {
  desktop: { label: "Desktop", color: theme.chart1 },
  mobile: { label: "Mobile", color: theme.chart2 },
} satisfies ChartConfig
const SERIES = ["desktop", "mobile"] as const
const desktopTotal = traffic.reduce((sum, row) => sum + row.desktop, 0)
const mobileTotal = traffic.reduce((sum, row) => sum + row.mobile, 0)
const delta = Math.round(((desktopTotal - mobileTotal) / mobileTotal) * 100)

/** Upstream's `<BarChart>`, as the registry's `chart-example` writes it on TanStack Charts. */
function trafficChart(rounded: boolean) {
  return defineChart(
    {
      marks: [
        barY(
          traffic.flatMap((row) =>
            SERIES.map((series) => ({
              month: row.month,
              series,
              visitors: row[series],
            }))
          ),
          {
            id: "visitors",
            x: "month",
            y: "visitors",
            color: "series",
            layout: group({ padding: 0.1 }),
            radius: rounded ? 6 : 0,
          }
        ),
      ],
      scales: {
        x: {
          scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
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
        y: { scale: scaleLinear, grid: true, axis: false },
      },
      color: {
        domain: SERIES,
        range: SERIES.map((series) => `var(--color-${series})`),
      },
      theme: chartTheme,
    },
    { focus: "group-x", tooltip: chartTooltip }
  )
}
const roundedChart = trafficChart(true)
const squareChart = trafficChart(false)

export function TrafficChannels() {
  const { system } = usePageDesign()
  const square = system.style === "lyra" || system.style === "sera"
  return (
    <Card>
      <CardHeader>
        <CardTitle sx={styles.chartTitle}>Traffic channels</CardTitle>
        <CardDescription sx={styles.clamp}>
          Monthly desktop and mobile traffic for the last six months—compare
          volume and mix across platforms and devices at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent sx={[shared.stack, styles.noTop]}>
        <ChartContainer
          config={trafficConfig}
          definition={square ? squareChart : roundedChart}
          ariaLabel="Desktop and mobile traffic, January to June"
          initialWidth={320}
          height={180}
          tooltip={<ChartTooltipContent indicator="dashed" />}
          legend={<ChartLegendContent />}
        />
        <div sx={styles.totals}>
          {[
            ["Desktop", desktopTotal.toLocaleString("en-US")],
            ["Mobile", mobileTotal.toLocaleString("en-US")],
            ["Mix Delta", `${delta > 0 ? "+" : ""}${delta}%`],
          ].map(([label, value]) => (
            <div key={label} sx={styles.total}>
              <div sx={styles.totalLabel}>{label}</div>
              <div sx={styles.figure}>{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={shared.full}>View report</Button>
      </CardFooter>
    </Card>
  )
}
