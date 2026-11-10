<script setup lang="ts">
import { injectProgressRootContext } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

// Reka has no value part: Base UI's, the value as a percentage unless a slot is given.
const { sx, attrs } = useSx()
const root = injectProgressRootContext()
const text = computed(() => {
  const value = root.modelValue?.value
  if (value == null) return ""
  return new Intl.NumberFormat(undefined, { style: "percent" }).format(
    value / root.max.value
  )
})
</script>

<template>
  <span data-slot="progress-value" v-bind="attrs" :sx="[progress.value, sx]">
    <slot>{{ text }}</slot>
  </span>
</template>
