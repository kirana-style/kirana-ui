<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Progress.Indicator
    data-slot="progress-indicator"
    v-bind="attrs"
    :sx="[progress.indicator, sx]"
  />
</template>
