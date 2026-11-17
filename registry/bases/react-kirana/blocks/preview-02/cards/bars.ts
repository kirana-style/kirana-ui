/**
 * The preview cards' bar charts on TanStack Charts: one series of bars over a band of categories,
 * as upstream's Recharts `<BarChart>` with a `<Bar>` and maybe an `<XAxis>`. Their ends are rounded
 * (`radius={[r, r, 0, 0]}`) but in Lyra and Sera, whose corners are square: a chart is defined once
 * for each, and `useRoundedBars` says which the design draws.
 */
import { barY, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { useDesign } from "../../../../../lib/use-design"
import { chartTheme, chartTooltip } from "../../../ui/chart"

type Margin = { top?: number; right?: number; bottom?: number; left?: number }

export function barCharts(
  data: readonly Record<string, string | number>[],
  options: {
    /** The series, as the config names it: its colour is `var(--color-<id>)`. */
    id: string
    x: string
    y: string
    /** Recharts' corner radius at a bar's end. */
    radius: number
    /** The category axis under the bars, `tickMargin` apart and its labels `format`ted, or none. */
    axis?:
      | {
          tickMargin: number
          fontSize?: number
          format?: (value: string) => string
        }
      | false
    /** Recharts' `maxBarSize`. */
    maxThickness?: number
    margin?: Margin
  }
) {
  const define = (radius: number) =>
    defineChart(
      {
        marks: [
          barY(data, {
            id: options.id,
            x: (row) => String(row[options.x]),
            y: (row) => Number(row[options.y]),
            fill: `var(--color-${options.id})`,
            ...(radius ? { radius: { end: radius } } : {}),
            ...(options.maxThickness
              ? { maxThickness: options.maxThickness }
              : {}),
          }),
        ],
        scales: {
          // Recharts' `barCategoryGap` of 10% each side, as band padding.
          x: {
            scale: () =>
              scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
            axis: options.axis
              ? {
                  line: false,
                  ticks: {
                    size: 0,
                    padding: options.axis.tickMargin,
                    ...(options.axis.format
                      ? { format: options.axis.format }
                      : {}),
                  },
                  tickLabels: { fontSize: options.axis.fontSize ?? 12 },
                }
              : false,
          },
          y: { scale: scaleLinear, axis: false },
        },
        // Only the sides the card names: the chart keeps room for its axis under the bars.
        ...(options.margin ? { margin: options.margin } : {}),
        theme: chartTheme,
      },
      { focus: "group-x", tooltip: chartTooltip }
    )
  return { rounded: define(options.radius), square: define(0) }
}

/** Whether the design rounds a bar's end: every style but Lyra and Sera. */
export function useRoundedBars() {
  const style = useDesign("style")
  return style !== "lyra" && style !== "sera"
}
