"use client"

/**
 * Charts on TanStack Charts, with shadcn/ui's chart API around them: a `ChartConfig` that names
 * and colours each series, a `ChartContainer`, and `ChartTooltipContent` and `ChartLegendContent`.
 * A chart is a definition (`defineChart`, marks and scales), not a tree of components: pass one to
 * `ChartContainer`, which sets the series colours, draws the tooltip body and gives the chart the
 * theme's colours through `chartTheme`. TanStack Charts renders the SVG on the server, so a
 * prerendered page shows the chart before any script runs.
 *
 * A series' colour is a custom property on the container, `--color-<key>`, as upstream's: a mark
 * reads `fill: "var(--color-desktop)"`. A config entry with per-mode colours uses `light-dark()`.
 */
import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import type { ChartPoint, ChartTheme, ChartValue } from "@tanstack/charts"
import { Chart } from "@tanstack/charts/react/tooltip"
import type { ChartProps } from "@tanstack/charts/react/tooltip"
import { tooltip } from "@tanstack/charts/tooltip"

import type { Sx } from "../../../lib/sx"
import { chart as styles } from "../../../styles/chart.styles"
import { alpha, theme } from "../../../core/tokens"

const THEMES = ["light", "dark"] as const

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<(typeof THEMES)[number], string> }
  )
>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

/** The focused points the tooltip body shows, set by `ChartContainer` for each focus. */
const PointsContext = React.createContext<readonly ChartPoint[]>([])

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

/**
 * The chart's own colours: ticks and axis titles in the muted foreground, the grid in the
 * half-strength border (upstream's `stroke-border/50`), the series in the five chart colours; no
 * ring on a focused mark, as upstream's charts draw none (`cursor={false}`). Give it to a
 * definition as `theme`.
 */
export const chartTheme: ChartTheme = {
  foreground: theme.mutedForeground,
  muted: theme.mutedForeground,
  grid: alpha.border50,
  background: "transparent",
  focusRing: false,
  palette: [
    theme.chart1,
    theme.chart2,
    theme.chart3,
    theme.chart4,
    theme.chart5,
  ],
}

/** The tooltip extension, for a definition's `tooltip`: `ChartContainer` draws its body. */
export const chartTooltip = { use: tooltip } as const

/** Each series' `--color-<key>`. */
function seriesColors(config: ChartConfig): React.CSSProperties {
  const vars: Record<string, string> = {}
  for (const [key, item] of Object.entries(config)) {
    if (item.theme) {
      vars[`--color-${key}`] =
        `light-dark(${item.theme.light}, ${item.theme.dark})`
    } else if (item.color) {
      vars[`--color-${key}`] = item.color
    }
  }
  return vars as React.CSSProperties
}

type ChartContainerProps<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
> = Omit<
  ChartProps<TDatum, TXValue, TYValue>,
  "className" | "style" | "renderTooltipBody"
> & {
  config: ChartConfig
  /** The tooltip body, usually a `<ChartTooltipContent />`; the definition needs `chartTooltip`. */
  tooltip?: React.ReactNode
  /** Under the chart, inside the container: a `<ChartLegendContent />`. */
  legend?: React.ReactNode
  sx?: Sx
}

/**
 * The chart, its series colours and its tooltip, in a `16 / 9` box as upstream's `aspect-video`.
 * Size the chart as TanStack Charts does: `initialWidth` with `aspectRatio` (by default the box's)
 * or `height`; the server renders it at that width and the browser at the container's.
 */
function ChartContainer<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>({
  config,
  tooltip: body,
  legend,
  sx,
  aspectRatio = 16 / 9,
  ...rest
}: ChartContainerProps<TDatum, TXValue, TYValue>) {
  const renderTooltipBody = body
    ? ({
        points,
      }: {
        points: readonly ChartPoint<TDatum, TXValue, TYValue>[]
      }) => (
        <PointsContext.Provider value={points as readonly ChartPoint[]}>
          {body}
        </PointsContext.Provider>
      )
    : undefined
  const { className, style } = styleProps(styles.container, sx)
  const plot = (
    <Chart
      {...rest}
      {...(rest.height === undefined ? { aspectRatio } : {})}
      {...styleProps(styles.plot)}
      renderTooltipBody={renderTooltipBody}
    />
  )

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        className={className}
        style={{ ...style, ...seriesColors(config) }}
      >
        {legend ? (
          // Recharts' wrapper: the plot and its legend in a column, inside the row the container is.
          <div sx={styles.withLegend}>
            {plot}
            {legend}
          </div>
        ) : (
          plot
        )}
      </div>
    </ChartContext.Provider>
  )
}

/** A point's number, and its category: on y and x for a vertical bar or a line, the other way for a horizontal bar. */
function valueOf(point: ChartPoint): ChartValue {
  return typeof point.yValue === "number" ? point.yValue : point.xValue
}
function categoryOf(point: ChartPoint): ChartValue {
  return typeof point.yValue === "number" ? point.xValue : point.yValue
}

/** A focused point's config entry: by its datum's `nameKey` field, else its series, else its mark. */
function pointConfig(config: ChartConfig, point: ChartPoint, nameKey?: string) {
  const field =
    nameKey && point.datum && typeof point.datum === "object"
      ? (point.datum as Record<string, unknown>)[nameKey]
      : undefined
  const name = String(field ?? point.group ?? point.markId)
  return { name, item: config[name] }
}

function ChartTooltipContent({
  sx,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelSx,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  /** The heading; by default the focused category, or its config label. */
  label?: React.ReactNode
  labelFormatter?: (
    label: React.ReactNode,
    points: readonly ChartPoint[]
  ) => React.ReactNode
  formatter?: (value: ChartValue, point: ChartPoint) => React.ReactNode
  /** One indicator colour for every row, instead of each series' own. */
  color?: string
  nameKey?: string
  labelKey?: string
  sx?: Sx
  labelSx?: Sx
}) {
  const { config } = useChart()
  const points = React.useContext(PointsContext)
  if (points.length === 0) return null

  const first = points[0]!
  const heading = hideLabel
    ? null
    : (label ??
      (labelKey
        ? config[labelKey]?.label
        : (config[String(categoryOf(first))]?.label ??
          String(categoryOf(first)))))
  const tooltipLabel =
    heading === null || heading === undefined ? null : (
      <div sx={[styles.tooltipLabel, labelSx]}>
        {labelFormatter ? labelFormatter(heading, points) : heading}
      </div>
    )
  // One series with a line or dashed marker: its label beside the value, not above the tooltip.
  const nestLabel = points.length === 1 && indicator !== "dot"

  return (
    <div sx={[styles.tooltip, sx]}>
      {nestLabel ? null : tooltipLabel}
      <div sx={styles.tooltipRows}>
        {points.map((point) => {
          const { name, item } = pointConfig(config, point, nameKey)
          const indicatorColor = color ?? point.color
          const value = valueOf(point)
          return (
            <div
              key={point.key}
              sx={[
                styles.tooltipRow,
                indicator === "dot" && styles.tooltipRowDot,
              ]}
            >
              {item?.icon ? (
                <item.icon />
              ) : hideIndicator ? null : (
                <div
                  sx={[
                    styles.indicator,
                    indicator === "dot" && styles.indicatorDot,
                    indicator === "line" && styles.indicatorLine,
                    indicator === "dashed" && styles.indicatorDashed,
                    nestLabel &&
                      indicator === "dashed" &&
                      styles.indicatorNested,
                  ]}
                  style={
                    {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor,
                    } as React.CSSProperties
                  }
                />
              )}
              <div
                sx={[
                  styles.tooltipBody,
                  nestLabel ? styles.tooltipBodyNested : styles.tooltipBodyFlat,
                ]}
              >
                <div sx={styles.tooltipNames}>
                  {nestLabel ? tooltipLabel : null}
                  <span sx={styles.tooltipName}>{item?.label ?? name}</span>
                </div>
                <span sx={styles.tooltipValue}>
                  {formatter
                    ? formatter(value, point)
                    : typeof value === "number"
                      ? value.toLocaleString()
                      : String(value)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** The config's series, each with its colour: a legend under or over the chart. */
function ChartLegendContent({
  sx,
  hideIcon = false,
  verticalAlign = "bottom",
  keys,
}: {
  hideIcon?: boolean
  verticalAlign?: "top" | "bottom"
  /** The series to list, in order; by default every config entry with a colour. */
  keys?: readonly string[]
  sx?: Sx
}) {
  const { config } = useChart()
  const entries = (keys ?? Object.keys(config)).filter(
    (key) => config[key]?.color || config[key]?.theme
  )
  if (entries.length === 0) return null

  return (
    <div
      sx={[
        styles.legend,
        verticalAlign === "top" ? styles.legendTop : styles.legendBottom,
        sx,
      ]}
    >
      {entries.map((key) => {
        const item = config[key]!
        return (
          <div key={key} sx={styles.legendItem}>
            {item.icon && !hideIcon ? (
              <item.icon />
            ) : (
              <div
                sx={styles.legendSwatch}
                style={
                  { "--color-bg": `var(--color-${key})` } as React.CSSProperties
                }
              />
            )}
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export { ChartContainer, ChartTooltipContent, ChartLegendContent, useChart }
