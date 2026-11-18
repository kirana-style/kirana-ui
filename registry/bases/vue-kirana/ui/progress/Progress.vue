<script setup lang="ts">
import { Progress } from "@kirana-ui/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"
import ProgressIndicator from "./ProgressIndicator.vue"
import ProgressTrack from "./ProgressTrack.vue"

defineOptions({ inheritAttrs: false })

const { value = null } = defineProps<{ value?: number | null }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Progress.Root
    data-slot="progress"
    :value="value"
    v-bind="attrs"
    :sx="[progress.root, sx]"
  >
    <slot />
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </Progress.Root>
</template>
