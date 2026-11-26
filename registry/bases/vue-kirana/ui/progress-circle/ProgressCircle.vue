<script setup lang="ts">
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
</script>

<template>
  <Progress.Root
    data-slot="progress-circle"
    :data-size="size"
    :value="value"
    :min="min"
    :max="max"
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
