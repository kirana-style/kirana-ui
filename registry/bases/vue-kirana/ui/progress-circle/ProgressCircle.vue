<script setup lang="ts">
import { computed } from "vue"
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import {
  progressCircle,
  progressCircleParts,
} from "../../../../styles/progress-circle.styles"
import ProgressCircleIndicator from "./ProgressCircleIndicator.vue"
import ProgressCircleTrack from "./ProgressCircleTrack.vue"

defineOptions({ inheritAttrs: false })

type ProgressCircleVariants = NonNullable<Parameters<typeof progressCircle>[0]>

/**
 * A progress ring: draws its track and its arc, and the slot in the middle. Its other props are the
 * primitive root's (`format`, `locale` …).
 */
const {
  value = null,
  min,
  max,
  size = "default",
} = defineProps<{
  value?: number | null
  min?: number
  max?: number
  size?: ProgressCircleVariants["size"]
}>()
const { sx, attrs } = useSx()

/** The value's share of the range, from 0 to 1, or `undefined` while it is not known. */
const share = computed(() => {
  const low = min ?? 0
  const high = max ?? 100
  if (value === null || high <= low) return undefined
  return Math.min(1, Math.max(0, (value - low) / (high - low)))
})
</script>

<template>
  <!-- The value's share of the range, which the arc is drawn from. -->
  <Progress.Root
    data-slot="progress-circle"
    :data-size="size"
    :value="value"
    :min="min"
    :max="max"
    :style="
      share === undefined ? undefined : { '--progress-circle-value': share }
    "
    v-bind="attrs"
    :sx="[progressCircleParts.scope, progressCircle({ size }), sx]"
  >
    <svg
      data-slot="progress-circle-svg"
      aria-hidden="true"
      :sx="progressCircleParts.svg"
    >
      <ProgressCircleTrack />
      <ProgressCircleIndicator />
    </svg>
    <slot />
  </Progress.Root>
</template>
