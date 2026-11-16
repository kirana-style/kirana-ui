<script setup lang="ts">
import { ProgressValue } from "@ui-sdk/vue/progress"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- ui-sdk's text (`40%`) unless the caller gives its own. -->
  <UisdkPart
    :part="ProgressValue"
    slot-name="progress-value"
    tag="span"
    v-bind="attrs"
    :sx="[progress.value, sx]"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </UisdkPart>
</template>
