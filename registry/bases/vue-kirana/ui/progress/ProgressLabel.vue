<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Progress.Label
    data-slot="progress-label"
    v-bind="attrs"
    :sx="[progress.label, sx]"
  >
    <slot />
  </Progress.Label>
</template>
