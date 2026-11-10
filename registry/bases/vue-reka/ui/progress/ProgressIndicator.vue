<script setup lang="ts">
import { injectProgressRootContext, ProgressIndicator } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const root = injectProgressRootContext()
// Reka leaves the indicator's size to its caller; this is Base UI's: as wide as the value, from
// the start of the track.
const style = computed(() => {
  const value = root.modelValue?.value
  if (value == null) return undefined
  return {
    insetInlineStart: 0,
    height: "inherit",
    width: `${(value / root.max.value) * 100}%`,
  }
})
</script>

<template>
  <ProgressIndicator
    data-slot="progress-indicator"
    :style="style"
    v-bind="attrs"
    :sx="[progress.indicator, sx]"
  >
    <slot />
  </ProgressIndicator>
</template>
