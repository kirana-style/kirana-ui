<script setup lang="ts">
import { ProgressRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"
import ProgressIndicator from "./ProgressIndicator.vue"
import ProgressTrack from "./ProgressTrack.vue"

defineOptions({ inheritAttrs: false })

// `value`, as Base UI's: Reka's `model-value`, for a progress its caller moves.
const { value } = defineProps<{ value?: number | null }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    :model-value="value"
    v-bind="attrs"
    :sx="[progress.root, sx]"
  >
    <slot />
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressRoot>
</template>
