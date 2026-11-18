<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Progress.Track
    data-slot="progress-track"
    v-bind="attrs"
    :sx="[progress.track, sx]"
  >
    <slot />
  </Progress.Track>
</template>
