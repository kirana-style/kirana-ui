<script setup lang="ts">
import { ProgressLabel } from "@ui-sdk/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ProgressLabel"
    slot-name="progress-label"
    tag="span"
    v-bind="attrs"
    :sx="[progress.label, sx]"
  >
    <slot />
  </UisdkPart>
</template>
