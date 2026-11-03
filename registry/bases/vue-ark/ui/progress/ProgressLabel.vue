<script setup lang="ts">
import { ProgressLabel } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ProgressLabel
    data-slot="progress-label"
    v-bind="attrs"
    :sx="[progress.label, sx]"
  >
    <slot />
  </ProgressLabel>
</template>
