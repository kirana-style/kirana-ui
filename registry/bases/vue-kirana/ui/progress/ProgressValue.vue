<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- The part writes the value itself; a caller's slot takes its place when given. -->
  <Progress.Value
    v-if="$slots.default"
    data-slot="progress-value"
    v-bind="attrs"
    :sx="[progress.value, sx]"
  >
    <slot />
  </Progress.Value>
  <Progress.Value
    v-else
    data-slot="progress-value"
    v-bind="attrs"
    :sx="[progress.value, sx]"
  />
</template>
