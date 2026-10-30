/**
 * Upstream's `chart-pie-interactive`, an interactive pie chart, on TanStack Charts' polar entry: the
 * months' desktop visitors as a donut, the month chosen in the header drawn 10px further out with a
 * ring around it (Recharts' `shape` for the active index) and its visitors written in the middle.
 * The chart's definition is made again when the month changes. The month swatches in the menu read
 * their colour from the config, since the menu's popup is outside the chart's colour variables.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { defineChart } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { pie, polar, radialArc, radialText } from "@tanstack/charts/polar"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { fontSize, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const description = "An interactive pie chart"

const styles = {
  card: css({ display: "flex", flexDirection: "column" }),
  // `flex-row items-start space-y-0 pb-0`: the header is a grid, so only `pb-0` acts, and the
  // menu sits on its second row, at its end, as upstream's does.
  header: css({ paddingBottom: { "*": null, base: 0 } }),
  title: css({ display: "grid", gap: space[1] }),
  // `ml-auto`, on the select's own element, which holds the trigger: Radix's renders none.
  select: css({ marginInlineStart: "auto" }),
  // `h-7 w-[130px] rounded-lg pl-2.5`.
  trigger: css({
    height: { "*": null, base: space[7] },
    width: { "*": null, base: "130px" },
    borderRadius: { "*": null, base: radius.lg },
    paddingInlineStart: { "*": null, base: space["2.5"] },
  }),
  selectContent: css({ borderRadius: { "*": null, base: radius.xl } }),
  selectItem: css({ borderRadius: { "*": null, base: radius.lg } }),
  option: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  swatch: css({
    display: "flex",
    width: space[3],
    height: space[3],
    flexShrink: 0,
    // `rounded-xs`, Tailwind's own: shadcn/ui's theme derives no `xs` from the radius.
    borderRadius: "0.125rem",
  }),
  // `flex flex-1 justify-center pb-0`.
  content: css({
    display: { "*": null, base: "flex" },
    flex: { "*": null, base: "1 1 0%" },
    justifyContent: { "*": null, base: "center" },
    paddingBottom: { "*": null, base: 0 },
  }),
  // `mx-auto aspect-square w-full max-w-[300px]`.
  chart: css({
    marginInline: "auto",
    aspectRatio: "1",
    width: "100%",
    maxWidth: "300px",
  }),
}

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: theme.chart1,
  },
  february: {
    label: "February",
    color: theme.chart2,
  },
  march: {
    label: "March",
    color: theme.chart3,
  },
  april: {
    label: "April",
    color: theme.chart4,
  },
  may: {
    label: "May",
    color: theme.chart5,
  },
} satisfies ChartConfig

/** A month of the config, the key its colour and label are under. */
type Month = Exclude<
  keyof typeof chartConfig,
  "visitors" | "desktop" | "mobile"
>

const MONTHS = desktopData.map((row) => row.month as Month)

// Recharts starts a pie at 3 o'clock and turns anticlockwise; TanStack Charts at 12, clockwise.
const slices = pie(desktopData, {
  value: "desktop",
  startAngle: Math.PI / 2,
  endAngle: Math.PI / 2 - Math.PI * 2,
})

/** The donut with one month active: further out, ringed, its visitors in the middle. */
function chartFor(activeMonth: Month) {
  const active = slices.filter((slice) => slice.month === activeMonth)
  const visitors = active[0]?.desktop ?? 0
  return defineChart(
    {
      marks: [
        polar({
          // Recharts' margin, 5px on every side, is taken off before the 80%.
          inset: 5,
          radiusRatio: 0.8,
          scales: { angle: null, radius: null },
          marks: [
            radialArc(
              slices.filter((slice) => slice.month !== activeMonth),
              { innerRadius: 60, color: "month", key: "month" }
            ),
            radialArc(active, {
              innerRadius: 60,
              outerRadius: (layout) => layout.radius + 10,
              color: "month",
              key: "month",
            }),
          ],
        }),
        // The active month's ring and its visitors: drawn, out of the tooltip's reach.
        decorative(
          polar({
            inset: 5,
            radiusRatio: 0.8,
            scales: {
              angle: { scale: scaleLinear().domain([0, 1]) },
              radius: { scale: scaleLinear().domain([0, 1]) },
            },
            marks: [
              radialArc(active, {
                innerRadius: (layout) => layout.radius + 12,
                outerRadius: (layout) => layout.radius + 25,
                color: "month",
                key: "month",
              }),
              radialText([visitors], {
                angle: () => 0,
                radius: () => 0,
                text: (value) => value.toLocaleString(),
                baseline: "middle",
                fill: theme.foreground,
                fontSize: 30,
                fontWeight: 700,
              }),
              radialText(["Visitors"], {
                angle: () => 0,
                radius: () => 0,
                dy: 24,
                baseline: "middle",
                fill: theme.mutedForeground,
              }),
            ],
          })
        ),
      ],
      scales: { x: null, y: null },
      color: {
        domain: MONTHS,
        range: MONTHS.map((month) => `var(--color-${month})`),
      },
      theme: chartTheme,
    },
    { tooltip: chartTooltip }
  )
}

export default function ChartPieInteractive() {
  const [activeMonth, setActiveMonth] = React.useState<Month>(MONTHS[0]!)
  const months = MONTHS
  const chart = React.useMemo(() => chartFor(activeMonth), [activeMonth])

  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.header}>
        <div sx={styles.title}>
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select
          sx={styles.select}
          selectedKey={activeMonth}
          onSelectionChange={(key) => setActiveMonth(key as Month)}
          aria-label="Select a value"
        >
          <SelectTrigger sx={styles.trigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent placement="bottom end" sx={styles.selectContent}>
            {months.map((month) => (
              <SelectItem
                key={month}
                id={month}
                textValue={String(chartConfig[month].label)}
                sx={styles.selectItem}
              >
                <div sx={styles.option}>
                  <span
                    sx={styles.swatch}
                    style={{ backgroundColor: chartConfig[month].color }}
                  />
                  {chartConfig[month].label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent sx={styles.content}>
        <ChartContainer
          config={chartConfig}
          definition={chart}
          ariaLabel="Desktop visitors by month, January to May 2024"
          initialWidth={300}
          aspectRatio={1}
          sx={styles.chart}
          tooltip={<ChartTooltipContent hideLabel nameKey="month" />}
        />
      </CardContent>
    </Card>
  )
}
