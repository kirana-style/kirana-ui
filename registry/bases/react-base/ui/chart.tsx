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
import type { ChartPoint, ChartValue } from "@tanstack/charts"
import { motion } from "@tanstack/charts/motion"
import { RendererChart } from "@tanstack/charts/react/tooltip"
import type { RendererChartProps } from "@tanstack/charts/react/tooltip"

import {
  categoryOf,
  pointConfig,
  seriesColors,
  valueOf,
} from "../../../lib/chart"
import type { Sx } from "../../../lib/sx"
import { chart as styles } from "../../../styles/chart.styles"

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
 * Recharts' entrance (its `animationDuration` of 1.5s and `animationEasing` of `ease`): bars and
 * paths grow from their baseline, radial marks from the centre, arcs sweep round; still where the
 * reader asks for less motion. It plays when the chart mounts in the browser (`ChartContainer`
 * mounts it again at its measured width).
 */
const entrance = motion({
  transition: { type: "tween", duration: 1500, easing: "ease" },
})

type ChartContainerProps<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
> = Omit<
  RendererChartProps<TDatum, TXValue, TYValue>,
  "className" | "style" | "renderTooltipBody" | "renderer"
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
  // With a legend and no height, the chart fills what the legend leaves of the box: TanStack
  // Charts then reads the height from its own box, as it reads the width.
  const fill = legend !== undefined && rest.height === undefined
  // The server draws the chart at `initialWidth`. Once mounted, and once the page's fonts have
  // come, the box is measured and the chart mounted again at that width, so its entrance plays
  // through: a repaint (at the measured width, or for a font that arrives and re-measures the
  // text) would end it, as a curve cannot morph from its baseline (LF-005). Until then the marks wait
  // (`data-entering`, `chart.container`).
  const box = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState<number>()
  React.useEffect(() => {
    let live = true
    void document.fonts.ready.then(() => {
      if (live)
        setWidth(box.current?.getBoundingClientRect().width || undefined)
    })
    return () => {
      live = false
    }
  }, [])
  const entering = width === undefined
  const plotProps = styleProps(styles.plot, fill && styles.plotWithLegend)
  const plot = (
    <RendererChart
      key={width ?? "server"}
      renderer={entrance}
      {...rest}
      {...(width === undefined ? {} : { initialWidth: width })}
      {...(rest.height === undefined && !fill ? { aspectRatio } : {})}
      className={plotProps.className}
      style={fill ? { ...plotProps.style, height: "auto" } : plotProps.style}
      renderTooltipBody={renderTooltipBody}
    />
  )

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={box}
        data-slot="chart"
        data-entering={entering ? "" : undefined}
        className={className}
        style={{ ...style, ...(seriesColors(config) as React.CSSProperties) }}
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
  /**
   * A row's content, in place of its indicator, name and value, as upstream's: given the value, the
   * series' key, the point, its index and its datum.
   */
  formatter?: (
    value: ChartValue,
    name: string,
    point: ChartPoint,
    index: number,
    datum: unknown
  ) => React.ReactNode
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
        {points.map((point, index) => {
          const { name, item } = pointConfig(config, point, nameKey)
          // Upstream's order: the row's own `fill`, else the series' colour (Recharts' item colour
          // is its stroke; a mark painted with a gradient, `url(#…)`, has none of its own to show),
          // else the mark's paint.
          const datum = point.datum as { fill?: unknown } | null
          const indicatorColor =
            color ??
            (typeof datum?.fill === "string"
              ? datum.fill
              : item?.color || item?.theme
                ? `var(--color-${name})`
                : point.color)
          const value = valueOf(point)
          return (
            <div
              key={point.key}
              sx={[
                styles.tooltipRow,
                indicator === "dot" && styles.tooltipRowDot,
              ]}
            >
              {formatter ? (
                formatter(value, name, point, index, point.datum)
              ) : (
                <>
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
                      nestLabel
                        ? styles.tooltipBodyNested
                        : styles.tooltipBodyFlat,
                    ]}
                  >
                    <div sx={styles.tooltipNames}>
                      {nestLabel ? tooltipLabel : null}
                      <span sx={styles.tooltipName}>{item?.label ?? name}</span>
                    </div>
                    <span sx={styles.tooltipValue}>
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : String(value)}
                    </span>
                  </div>
                </>
              )}
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

export {
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
  radialBands,
} from "../../../lib/chart"
export { ChartContainer, ChartTooltipContent, ChartLegendContent, useChart }
