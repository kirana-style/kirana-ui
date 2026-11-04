<script lang="ts">
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { StyleHandle, Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import type { ChartPoint, ChartValue } from "@tanstack/charts"

  import { chart as styles } from "../../../../styles/chart.styles"
  import { CHART, POINTS, categoryOf, pointConfig, valueOf } from "./chart"
  import type { ChartContext, PointsContext } from "./chart"

  let {
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    formatter,
    color,
    nameKey,
    labelKey,
    labelSx,
    row,
    class: className,
    ...rest
  }: {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    /** The heading; by default the focused category, or its config label. */
    label?: string
    labelFormatter?: (label: string, points: readonly ChartPoint[]) => string
    /**
    * A row's text, in place of its indicator, name and value, given the value, the series' key, the
    * point, its index and its datum; for markup, the `row` snippet takes the same.
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
    row?: Snippet<
      [{ value: ChartValue; name: string; point: ChartPoint; index: number; datum: unknown }]
    >
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const chart = getContext<ChartContext | undefined>(CHART)
  const points = getContext<PointsContext | undefined>(POINTS)

  const config = $derived.by(() => chart?.config ?? {})
  const heading = $derived.by(() => {
    const first = points?.points[0]
    if (hideLabel || !first) return undefined
    return (
      label ??
      (labelKey
        ? config[labelKey]?.label
        : (config[String(categoryOf(first))]?.label ??
          String(categoryOf(first))))
    )
  })
  // One series with a line or dashed marker: its label beside the value, not above the tooltip.
  const nestLabel = $derived((points?.points.length ?? 0) === 1 && indicator !== "dot")
  const rows = $derived.by(() => (points?.points ?? []).map((point, index) => {
      const { name, item } = pointConfig(config, point, nameKey)
      const datum = point.datum as { fill?: unknown } | null
      const indicatorColor =
        color ??
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
        value: typeof value === "number" ? value.toLocaleString() : String(value),
        raw: value,
      }
    })
  )
  const headingText = $derived.by(() => heading === undefined
      ? undefined
      : labelFormatter
        ? labelFormatter(heading, points?.points ?? [])
        : heading
  )
</script>

{#if rows.length}
  <div {...rest} sx={[styles.tooltip, className as Sx]}>
    {#if !nestLabel && headingText !== undefined}
      <div sx={[styles.tooltipLabel, labelSx]}>
        {headingText}
      </div>
    {/if}
    <div sx={styles.tooltipRows}>
      {#each rows as entry (entry.key)}
        <div sx={[styles.tooltipRow, indicator === 'dot' && styles.tooltipRowDot]}>
          {#if row}
            {@render row({ value: entry.raw, name: entry.name, point: entry.point, index: entry.index, datum: entry.point.datum })}
          {:else if formatter}
            {formatter(entry.raw, entry.name, entry.point, entry.index, entry.point.datum)}
          {:else}
            {#if entry.item?.icon}
              {@const Icon = entry.item.icon}
              <Icon />
            {:else if !hideIndicator}
              <div sx={[
              styles.indicator,
              indicator === 'dot' && styles.indicatorDot,
              indicator === 'line' && styles.indicatorLine,
              indicator === 'dashed' && styles.indicatorDashed,
              nestLabel && indicator === 'dashed' && styles.indicatorNested,
            ]} style:--color-bg={entry.indicatorColor} style:--color-border={entry.indicatorColor}></div>
            {/if}
            <div sx={[
              styles.tooltipBody,
              nestLabel ? styles.tooltipBodyNested : styles.tooltipBodyFlat,
            ]}>
              <div sx={styles.tooltipNames}>
                {#if nestLabel && headingText !== undefined}
                  <div sx={[styles.tooltipLabel, labelSx]}>
                    {headingText}
                  </div>
                {/if}
                <span sx={styles.tooltipName}>
                  {entry.item?.label ?? entry.name}
                </span>
              </div>
              <span sx={styles.tooltipValue}>
                {entry.value}
              </span>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
