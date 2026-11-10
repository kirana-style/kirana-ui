<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { chart as styles } from "../../../../styles/chart.styles"
import { CHART } from "./chart"

defineOptions({ inheritAttrs: false })

const {
  hideIcon = false,
  verticalAlign = "bottom",
  keys,
} = defineProps<{
  hideIcon?: boolean
  verticalAlign?: "top" | "bottom"
  /** The series to list, in order; by default every config entry with a colour. */
  keys?: readonly string[]
}>()
const { sx, attrs } = useSx()
const chart = inject(CHART)
const config = computed(() => chart?.config ?? {})
const entries = computed(() =>
  (keys ?? Object.keys(config.value)).filter(
    (key) => config.value[key]?.color || config.value[key]?.theme
  )
)
</script>

<template>
  <div
    v-if="entries.length"
    v-bind="attrs"
    :sx="[
      styles.legend,
      verticalAlign === 'top' ? styles.legendTop : styles.legendBottom,
      sx,
    ]"
  >
    <div v-for="key in entries" :key="key" :sx="styles.legendItem">
      <component
        :is="config[key]!.icon"
        v-if="config[key]!.icon && !hideIcon"
      />
      <div
        v-else
        :sx="styles.legendSwatch"
        :style="{ '--color-bg': `var(--color-${key})` }"
      />
      {{ config[key]!.label }}
    </div>
  </div>
</template>
