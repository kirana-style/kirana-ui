<script setup lang="ts">
import { ProgressTrack } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ProgressTrack
    data-slot="progress-track"
    v-bind="attrs"
    :sx="[progress.track, sx]"
  >
    <slot />
  </ProgressTrack>
</template>
