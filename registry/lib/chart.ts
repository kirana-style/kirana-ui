/**
 * The chart's helpers that need no framework, which each framework's `chart` exports beside its
 * container: the theme, the ticks and radial bands as Recharts lays them out, the tooltip
 * extension, the series' colours, and what a focused point shows.
 */
import type { ChartPoint, ChartTheme, ChartValue } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { tooltip } from "@tanstack/charts/tooltip"

import { alpha, theme } from "../core/tokens"

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

/**
 * A value axis rounded as Recharts rounds it: `count` evenly spaced ticks from zero (or the lowest
 * value, when it is negative) past the highest, with a step of one or two significant digits (80,
 * 150, 2.5). Upstream's charts hide that axis and draw their grid on its ticks; give `domain` to the
 * scale and `ticks` to the grid's axis (`hiddenAxis`), and the grid falls where upstream's does.
 */
export function niceTicks(values: readonly number[], count = 5) {
  const low = Math.min(0, ...values)
  const high = Math.max(0, ...values)
  const rough = (high - low) / (count - 1) || 1
  const digits = Math.floor(Math.log10(rough)) + 1
  const unit = 10 ** digits
  const scale = digits === 1 ? 0.1 : 0.05
  let step = Math.ceil(rough / unit / scale - 1e-9) * scale * unit
  let start = low < 0 ? Math.floor(low / step) * step : 0
  // A negative start can push the top past `count` steps: take the next step up.
  while (start + step * (count - 1) < high) {
    step = (Math.ceil(step / unit / scale + 1e-9) + 1) * scale * unit
    start = low < 0 ? Math.floor(low / step) * step : 0
  }
  const ticks = Array.from(
    { length: count },
    (_, index) => +(start + step * index).toPrecision(12)
  )
  return { domain: [ticks[0]!, ticks[count - 1]!] as [number, number], ticks }
}

/** An axis that draws nothing but places the grid on `ticks`, as upstream's hidden `YAxis`. */
export function hiddenAxis(ticks: readonly number[]) {
  return {
    line: false,
    ticks: { values: ticks, size: 0 },
    tickLabels: false,
  } as const
}

/**
 * A radial chart's radius as Recharts lays out its bars between `innerRadius` and `outerRadius`:
 * a band for each category, its bar 10% of the band in from its start (`barCategoryGap`) and 80%
 * of it wide, in whole pixels. Give it to the polar container's `radius` scale.
 */
export function radialBands<TValue extends string>(
  domain: readonly TValue[],
  innerRadius: number,
  outerRadius: number
) {
  const band = (outerRadius - innerRadius) / domain.length
  const gap = 1 - Math.floor(band * 0.8) / band
  return {
    scale: () =>
      scaleBand<TValue>()
        .domain(domain)
        .paddingInner(gap)
        .paddingOuter(gap / 2)
        .align(0.1 / gap),
    range: [innerRadius, outerRadius] as [number, number],
  }
}

/**
 * The tooltip extension, for a definition's `tooltip`: `ChartContainer` draws its body. It moves
 * at once, out of the entrance's timing.
 */
export const chartTooltip = { use: tooltip, motion: false } as const

/** Each series' `--color-<key>`. */
export function seriesColors(
  config: Record<
    string,
    { color?: string; theme?: Record<"light" | "dark", string> }
  >
): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [key, item] of Object.entries(config)) {
    if (item.theme) {
      vars[`--color-${key}`] =
        `light-dark(${item.theme.light}, ${item.theme.dark})`
    } else if (item.color) {
      vars[`--color-${key}`] = item.color
    }
  }
  return vars
}

/** A point's number, and its category: on y and x for a vertical bar or a line, the other way for a horizontal bar. (Not `valueOf`: a module-level one shadows the global, which Biome refuses.) */
export function pointValue(point: ChartPoint): ChartValue {
  // A pie's slice (`pie()` from the polar entry) holds its share as `value`, beside `fraction`;
  // its point's own values are the arc's angle and radius, as Recharts' payload is the slice's.
  const slice = point.datum as { value?: unknown; fraction?: unknown } | null
  if (
    slice &&
    typeof slice.value === "number" &&
    typeof slice.fraction === "number"
  )
    return slice.value
  return typeof point.yValue === "number" ? point.yValue : point.xValue
}
export function categoryOf(point: ChartPoint): ChartValue {
  return typeof point.yValue === "number" ? point.xValue : point.yValue
}

/**
 * A focused point's config entry, as upstream finds it: by its datum's `nameKey` field when that is
 * a string (a key such as `"chrome"`), else `nameKey` itself when the config has it (upstream's
 * `nameKey="views"` or `"visitors"`), else its series, else its mark.
 */
export function pointConfig<Item>(
  config: Record<string, Item>,
  point: ChartPoint,
  nameKey?: string
) {
  const field =
    nameKey && point.datum && typeof point.datum === "object"
      ? (point.datum as Record<string, unknown>)[nameKey]
      : undefined
  const name = String(
    (typeof field === "string" ? field : undefined) ??
      (nameKey && nameKey in config ? nameKey : undefined) ??
      point.group ??
      point.markId
  )
  // A name the config does not list (a series it leaves out) has no entry.
  return { name, item: config[name] as Item | undefined }
}
