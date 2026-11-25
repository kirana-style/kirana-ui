<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progressCircleParts } from "../../../../styles/progress-circle.styles"

defineOptions({ inheritAttrs: false })

/** The value, written (a percentage of the range by default), for the middle of the ring. */
const { sx, attrs } = useSx()
</script>

<template>
  <!-- The part writes the value itself; a caller's slot takes its place when given. -->
  <Progress.Value
    v-if="$slots.default"
    data-slot="progress-circle-label"
    v-bind="attrs"
    :sx="[progressCircleParts.label, sx]"
  >
    <slot />
  </Progress.Value>
  <Progress.Value
    v-else
    data-slot="progress-circle-label"
    v-bind="attrs"
    :sx="[progressCircleParts.label, sx]"
  />
</template>
