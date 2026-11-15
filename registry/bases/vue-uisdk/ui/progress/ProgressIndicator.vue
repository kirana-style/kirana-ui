<script setup lang="ts">
import { ProgressIndicator } from "@ui-sdk/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ProgressIndicator"
    name="progress-indicator"
    tag="div"
    v-bind="attrs"
    :sx="[progress.indicator, sx]"
  >
    <slot />
  </UisdkPart>
</template>
