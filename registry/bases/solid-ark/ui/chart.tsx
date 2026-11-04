/**
 * The chart, its series colours and its tooltip, on TanStack Charts' Solid `Chart`, as React's on
 * its React one: the same definitions and config. The helpers that need no framework are
 * `lib/chart.ts`, re-exported here.
 */
import {
  For,
  Show,
  createContext,
  createSignal,
  mergeProps,
  onMount,
  splitProps,
  useContext,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import { props as styleProps } from "@kirana-style/core"
import { Chart } from "@tanstack/charts/solid"
import type { Component, JSX } from "solid-js"
import type { StyleHandle, Sx } from "@kirana-style/core"
import type {
  ChartPoint,
  ChartValue,
  DomChartDefinition,
} from "@tanstack/charts"
import { chart as styles } from "../../../styles/chart.styles"
import {
  categoryOf,
  pointConfig,
  seriesColors,
  valueOf,
} from "../../../lib/chart"

export * from "../../../lib/chart"

const THEMES = ["light", "dark"] as const

export type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: Component
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<(typeof THEMES)[number], string> }
  )
>

/** The chart's config, which its tooltip and legend read. */
const ChartContext = createContext<{ readonly config: ChartConfig }>()
/** The focused points the tooltip body shows, set by `ChartContainer` for each focus. */
const PointsContext = createContext<{
  readonly points: readonly ChartPoint[]
}>()

function ChartContainer(props: {
  config: ChartConfig
  // `any`: a caller's definition is of its own data, which `unknown` would refuse.
  // oxlint-disable-next-line no-explicit-any
  definition: DomChartDefinition<any, any, any>
  aspectRatio?: number
  height?: number
  initialWidth?: number
  ariaLabel: string
  /** The tooltip's body: a `ChartTooltipContent`. */
  tooltip?: JSX.Element
  /** The legend under the chart: a `ChartLegendContent`. */
  legend?: JSX.Element
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ aspectRatio: 16 / 9 } as const, props),
    [
      "config",
      "definition",
      "aspectRatio",
      "height",
      "initialWidth",
      "ariaLabel",
      "tooltip",
      "legend",
      "class",
      "sx",
    ]
  )
  const context = {
    get config() {
      return local.config
    },
  }
  // With a legend and no height, the chart fills what the legend leaves of the box.
  const fill = () => !!local.legend && local.height === undefined
  // Drawn at `initialWidth` first; once mounted, and once the page's fonts have come, at the box's
  // width (the marks wait meanwhile: `data-entering`, `chart.container`).
  let box: HTMLDivElement | undefined
  const [width, setWidth] = createSignal<number>()
  onMount(() => {
    void document.fonts.ready.then(() => {
      setWidth(box?.getBoundingClientRect().width || undefined)
    })
  })
  const own = () => styleProps(local.class, styles.container, local.sx)
  const plot = () => styleProps(styles.plot, fill() && styles.plotWithLegend)
  // Keyed by the width, as React's: the chart is drawn again at the box's.
  const chart = () => (
    <For each={[width()]}>
      {() => (
        <Chart
          definition={local.definition}
          ariaLabel={local.ariaLabel}
          height={local.height}
          initialWidth={width() ?? local.initialWidth}
          aspectRatio={
            local.height === undefined && !fill()
              ? local.aspectRatio
              : undefined
          }
          class={plot().class}
          style={{
            ...plot().style,
            ...(fill() ? { height: "auto" } : {}),
          }}
          renderTooltipBody={
            local.tooltip
              ? ({ points }) => (
                  <PointsContext.Provider
                    value={{
                      get points() {
                        return points
                      },
                    }}
                  >
                    {local.tooltip}
                  </PointsContext.Provider>
                )
              : undefined
          }
        />
      )}
    </For>
  )
  return (
    <ChartContext.Provider value={context}>
      <div
        ref={(node) => (box = node)}
        data-slot="chart"
        data-entering={width() === undefined ? "" : undefined}
        {...rest}
        class={own().class}
        style={{
          ...own().style,
          ...(seriesColors(local.config) as JSX.CSSProperties),
        }}
      >
        <Show when={local.legend} fallback={chart()}>
          <div sx={styles.withLegend}>
            {chart()}
            {local.legend}
          </div>
        </Show>
      </div>
    </ChartContext.Provider>
  )
}

function ChartLegendContent(props: {
  hideIcon?: boolean
  verticalAlign?: "top" | "bottom"
  /** The series to list, in order; by default every config entry with a colour. */
  keys?: readonly string[]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ hideIcon: false, verticalAlign: "bottom" } as const, props),
    ["hideIcon", "verticalAlign", "keys", "class", "sx"]
  )
  const chart = useContext(ChartContext)
  const config = () => chart?.config ?? {}
  const entries = () =>
    (local.keys ?? Object.keys(config())).filter(
      (key) => config()[key]?.color || config()[key]?.theme
    )
  return (
    <Show when={entries().length}>
      <div
        {...rest}
        {...styleProps(
          local.class,
          styles.legend,
          local.verticalAlign === "top"
            ? styles.legendTop
            : styles.legendBottom,
          local.sx
        )}
      >
        <For each={entries()}>
          {(key) => (
            <div sx={styles.legendItem}>
              <Show
                when={!local.hideIcon && config()[key]!.icon}
                fallback={
                  <div
                    sx={styles.legendSwatch}
                    style={{ "--color-bg": `var(--color-${key})` }}
                  />
                }
              >
                {(icon) => <Dynamic component={icon()} />}
              </Show>
              {config()[key]!.label}
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}

function ChartTooltipContent(props: {
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  /** The heading; by default the focused category, or its config label. */
  label?: string
  labelFormatter?: (label: string, points: readonly ChartPoint[]) => string
  /**
   * A row's text, in place of its indicator, name and value, given the value, the series' key, the
   * point, its index and its datum; for markup, `row` takes the same.
   */
  formatter?: (
    value: ChartValue,
    name: string,
    point: ChartPoint,
    index: number,
    datum: unknown
  ) => string
  /** One indicator colour for every row, instead of each series' own. */
  color?: string
  nameKey?: string
  labelKey?: string
  labelSx?: StyleHandle
  /** A row's markup, in place of its indicator, name and value; given what `formatter` is. */
  row?: (row: {
    value: ChartValue
    name: string
    point: ChartPoint
    index: number
    datum: unknown
  }) => JSX.Element
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { indicator: "dot", hideLabel: false, hideIndicator: false } as const,
      props
    ),
    [
      "indicator",
      "hideLabel",
      "hideIndicator",
      "label",
      "labelFormatter",
      "formatter",
      "color",
      "nameKey",
      "labelKey",
      "labelSx",
      "row",
      "class",
      "sx",
    ]
  )
  const chart = useContext(ChartContext)
  const points = useContext(PointsContext)
  const config = () => chart?.config ?? {}
  const focused = () => points?.points ?? []
  const heading = () => {
    const first = focused()[0]
    if (local.hideLabel || !first) return undefined
    return (
      local.label ??
      (local.labelKey
        ? config()[local.labelKey]?.label
        : (config()[String(categoryOf(first))]?.label ??
          String(categoryOf(first))))
    )
  }
  // One series with a line or dashed marker: its label beside the value, not above the tooltip.
  const nestLabel = () => focused().length === 1 && local.indicator !== "dot"
  const rows = () =>
    focused().map((point, index) => {
      const { name, item } = pointConfig(config(), point, local.nameKey)
      const datum = point.datum as { fill?: unknown } | null
      const indicatorColor =
        local.color ??
        (typeof datum?.fill === "string"
          ? datum.fill
          : item?.color || item?.theme
            ? `var(--color-${name})`
            : point.color)
      const value = valueOf(point)
      return {
        key: point.key,
        point,
        index,
        name,
        item,
        indicatorColor,
        value:
          typeof value === "number" ? value.toLocaleString() : String(value),
        raw: value,
      }
    })
  const headingText = () => {
    const text = heading()
    return text === undefined
      ? undefined
      : local.labelFormatter
        ? local.labelFormatter(text, focused())
        : text
  }
  return (
    <Show when={rows().length}>
      <div {...rest} {...styleProps(local.class, styles.tooltip, local.sx)}>
        <Show when={!nestLabel() && headingText() !== undefined}>
          <div sx={[styles.tooltipLabel, local.labelSx]}>{headingText()}</div>
        </Show>
        <div sx={styles.tooltipRows}>
          <For each={rows()}>
            {(entry) => (
              <div
                sx={[
                  styles.tooltipRow,
                  local.indicator === "dot" && styles.tooltipRowDot,
                ]}
              >
                {local.row ? (
                  local.row({
                    value: entry.raw,
                    name: entry.name,
                    point: entry.point,
                    index: entry.index,
                    datum: entry.point.datum,
                  })
                ) : local.formatter ? (
                  local.formatter(
                    entry.raw,
                    entry.name,
                    entry.point,
                    entry.index,
                    entry.point.datum
                  )
                ) : (
                  <>
                    <Show
                      when={entry.item?.icon}
                      fallback={
                        <Show when={!local.hideIndicator}>
                          <div
                            sx={[
                              styles.indicator,
                              local.indicator === "dot" && styles.indicatorDot,
                              local.indicator === "line" &&
                                styles.indicatorLine,
                              local.indicator === "dashed" &&
                                styles.indicatorDashed,
                              nestLabel() &&
                                local.indicator === "dashed" &&
                                styles.indicatorNested,
                            ]}
                            style={{
                              "--color-bg": entry.indicatorColor,
                              "--color-border": entry.indicatorColor,
                            }}
                          />
                        </Show>
                      }
                    >
                      {(icon) => <Dynamic component={icon()} />}
                    </Show>
                    <div
                      sx={[
                        styles.tooltipBody,
                        nestLabel()
                          ? styles.tooltipBodyNested
                          : styles.tooltipBodyFlat,
                      ]}
                    >
                      <div sx={styles.tooltipNames}>
                        <Show when={nestLabel() && headingText() !== undefined}>
                          <div sx={[styles.tooltipLabel, local.labelSx]}>
                            {headingText()}
                          </div>
                        </Show>
                        <span sx={styles.tooltipName}>
                          {entry.item?.label ?? entry.name}
                        </span>
                      </div>
                      <span sx={styles.tooltipValue}>{entry.value}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}

export { ChartContainer, ChartLegendContent, ChartTooltipContent }
