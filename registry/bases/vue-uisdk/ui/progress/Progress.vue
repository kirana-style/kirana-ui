<script setup lang="ts">
import { Progress } from "@ui-sdk/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import ProgressIndicator from "./ProgressIndicator.vue"
import ProgressTrack from "./ProgressTrack.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

// `value`, as Base UI's and Ark UI's parts take it.
const { value } = defineProps<{ value?: number | null }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Progress"
    name="progress"
    tag="div"
    :value="value"
    v-bind="attrs"
    :sx="[progress.root, sx]"
  >
    <slot />
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </UisdkPart>
</template>
