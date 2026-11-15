<script setup lang="ts">
import { ProgressTrack } from "@ui-sdk/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ProgressTrack"
    name="progress-track"
    tag="div"
    v-bind="attrs"
    :sx="[progress.track, sx]"
  >
    <slot />
  </UisdkPart>
</template>
