<script setup lang="ts">
/**
 * The chart, its series colours and its tooltip, in a `16 / 9` box as upstream's `aspect-video`,
 * on TanStack Charts' Vue `Chart`. Size it as TanStack Charts does: `initialWidth` with
 * `aspectRatio` (by default the box's) or `height`. The tooltip body is the `tooltip` slot (a
 * `ChartTooltipContent`), the legend under the chart the `legend` slot. Vue's `Chart` has no
 * renderer host, so the marks appear without React's entrance (LF-007).
 */
import type { DomChartDefinition } from "@tanstack/charts"
import { Chart } from "@tanstack/charts/vue"
import { props as styleProps } from "@kirana-style/core"
import { useSx } from "@kirana-style/core/vue"
import { computed, onMounted, provide, ref, useSlots } from "vue"

import { chart as styles } from "../../../../styles/chart.styles"
import { CHART, seriesColors } from "./chart"
import type { ChartConfig } from "./chart"
import ChartPoints from "./ChartPoints.vue"

defineOptions({ inheritAttrs: false })

const {
  config,
  definition,
  aspectRatio = 16 / 9,
  height,
  initialWidth,
  ariaLabel,
} = defineProps<{
  config: ChartConfig
  // `any`: a caller's definition is of its own data, which `unknown` would refuse.
  definition: DomChartDefinition<any, any, any>
  aspectRatio?: number
  height?: number
  initialWidth?: number
  ariaLabel?: string
}>()
const { sx, attrs } = useSx()
const slots = useSlots()
provide(CHART, {
  get config() {
    return config
  },
})

// With a legend and no height, the chart fills what the legend leaves of the box.
const fill = computed(() => !!slots.legend && height === undefined)
// Drawn at `initialWidth` first; once mounted, and once the page's fonts have come, at the box's
// width (the marks wait meanwhile: `data-entering`, `chart.container`).
const box = ref<HTMLDivElement>()
const width = ref<number>()
onMounted(() => {
  void document.fonts.ready.then(() => {
    width.value = box.value?.getBoundingClientRect().width || undefined
  })
})
const plot = computed(() =>
  styleProps(styles.plot, fill.value && styles.plotWithLegend)
)
</script>

<template>
  <div
    ref="box"
    data-slot="chart"
    :data-entering="width === undefined ? '' : undefined"
    v-bind="attrs"
    :sx="[styles.container, sx]"
    :style="seriesColors(config)"
  >
    <div v-if="$slots.legend" :sx="styles.withLegend">
      <Chart
        :key="width ?? 'server'"
        :definition="definition"
        :aria-label="ariaLabel"
        :height="height"
        :initial-width="width ?? initialWidth"
        :aspect-ratio="height === undefined && !fill ? aspectRatio : undefined"
        :class="plot.className"
        :style="fill ? { ...plot.style, height: 'auto' } : plot.style"
      >
        <template v-if="$slots.tooltip" #tooltipBody="{ points }">
          <ChartPoints :points="points"><slot name="tooltip" /></ChartPoints>
        </template>
      </Chart>
      <slot name="legend" />
    </div>
    <Chart
      v-else
      :key="width ?? 'server'"
      :definition="definition"
      :aria-label="ariaLabel"
      :height="height"
      :initial-width="width ?? initialWidth"
      :aspect-ratio="height === undefined ? aspectRatio : undefined"
      :class="plot.className"
      :style="plot.style"
    >
      <template v-if="$slots.tooltip" #tooltipBody="{ points }">
        <ChartPoints :points="points"><slot name="tooltip" /></ChartPoints>
      </template>
    </Chart>
  </div>
</template>
