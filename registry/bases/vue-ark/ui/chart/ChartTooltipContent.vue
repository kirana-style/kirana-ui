<script setup lang="ts">
import type { ChartPoint, ChartValue } from "@tanstack/charts"
import { useSx } from "@kirana-style/core/vue"
import type { StyleHandle } from "@kirana-style/core"
import { computed, inject } from "vue"

import { chart as styles } from "../../../../styles/chart.styles"
import { CHART, POINTS, categoryOf, pointConfig, valueOf } from "./chart"

defineOptions({ inheritAttrs: false })

const {
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
} = defineProps<{
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  /** The heading; by default the focused category, or its config label. */
  label?: string
  labelFormatter?: (label: string, points: readonly ChartPoint[]) => string
  /**
   * A row's text, in place of its indicator, name and value, given the value, the series' key, the
   * point, its index and its datum; for markup, the `row` slot takes the same.
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
}>()
const { sx, attrs } = useSx()
const chart = inject(CHART)
const points = inject(POINTS, undefined)

const config = computed(() => chart?.config ?? {})
const heading = computed(() => {
  const first = points?.value[0]
  if (hideLabel || !first) return undefined
  return (
    label ??
    (labelKey
      ? config.value[labelKey]?.label
      : (config.value[String(categoryOf(first))]?.label ??
        String(categoryOf(first))))
  )
})
// One series with a line or dashed marker: its label beside the value, not above the tooltip.
const nestLabel = computed(
  () => (points?.value.length ?? 0) === 1 && indicator !== "dot"
)
const rows = computed(() =>
  (points?.value ?? []).map((point, index) => {
    const { name, item } = pointConfig(config.value, point, nameKey)
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
const headingText = computed(() =>
  heading.value === undefined
    ? undefined
    : labelFormatter
      ? labelFormatter(heading.value, points?.value ?? [])
      : heading.value
)
</script>

<template>
  <div v-if="rows.length" v-bind="attrs" :sx="[styles.tooltip, sx]">
    <div
      v-if="!nestLabel && headingText !== undefined"
      :sx="[styles.tooltipLabel, labelSx]"
    >
      {{ headingText }}
    </div>
    <div :sx="styles.tooltipRows">
      <div
        v-for="row in rows"
        :key="row.key"
        :sx="[styles.tooltipRow, indicator === 'dot' && styles.tooltipRowDot]"
      >
        <slot
          v-if="$slots.row"
          name="row"
          :value="row.raw"
          :name="row.name"
          :point="row.point"
          :index="row.index"
          :datum="row.point.datum"
        />
        <template v-else-if="formatter">{{
          formatter(row.raw, row.name, row.point, row.index, row.point.datum)
        }}</template>
        <template v-else>
          <component :is="row.item.icon" v-if="row.item?.icon" />
          <div
            v-else-if="!hideIndicator"
            :sx="[
              styles.indicator,
              indicator === 'dot' && styles.indicatorDot,
              indicator === 'line' && styles.indicatorLine,
              indicator === 'dashed' && styles.indicatorDashed,
              nestLabel && indicator === 'dashed' && styles.indicatorNested,
            ]"
            :style="{
              '--color-bg': row.indicatorColor,
              '--color-border': row.indicatorColor,
            }"
          />
          <div
            :sx="[
              styles.tooltipBody,
              nestLabel ? styles.tooltipBodyNested : styles.tooltipBodyFlat,
            ]"
          >
            <div :sx="styles.tooltipNames">
              <div
                v-if="nestLabel && headingText !== undefined"
                :sx="[styles.tooltipLabel, labelSx]"
              >
                {{ headingText }}
              </div>
              <span :sx="styles.tooltipName">{{
                row.item?.label ?? row.name
              }}</span>
            </div>
            <span :sx="styles.tooltipValue">{{ row.value }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
