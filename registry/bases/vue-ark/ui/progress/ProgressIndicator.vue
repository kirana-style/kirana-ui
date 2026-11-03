<script setup lang="ts">
import { ProgressRange } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ProgressRange
    data-slot="progress-indicator"
    v-bind="attrs"
    :sx="[progress.indicator, sx]"
  >
    <slot />
  </ProgressRange>
</template>
