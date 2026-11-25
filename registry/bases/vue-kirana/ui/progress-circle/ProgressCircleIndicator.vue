<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { progressCircleParts } from "../../../../styles/progress-circle.styles"

defineOptions({ inheritAttrs: false })

/** The filled part: an arc as long as the value's share of the range. */
const { sx, attrs } = useSx()
</script>

<template>
  <circle
    data-slot="progress-circle-indicator"
    pathLength="100"
    v-bind="attrs"
    :sx="[progressCircleParts.indicator, sx]"
  />
</template>
