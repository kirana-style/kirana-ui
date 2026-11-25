<script setup lang="ts">
import type { TourStep as TourStepPrimitive } from "@kirana-ui/vue"
import { Tour } from "@kirana-ui/vue/tour"

defineOptions({ inheritAttrs: false })

/**
 * The root: the steps, and whether the tour is open (`v-model:open`) and which step it shows
 * (`v-model:step`). It draws nothing.
 */
const { steps } = defineProps<{ steps: readonly TourStepPrimitive[] }>()
</script>

<template>
  <Tour.Root :steps="steps" v-bind="$attrs">
    <slot />
  </Tour.Root>
</template>
