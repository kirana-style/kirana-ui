<script setup lang="ts">
import { ProgressValueText } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ProgressValueText
    data-slot="progress-value"
    v-bind="attrs"
    :sx="[progress.value, sx]"
  >
    <!-- Passed to Ark only when given, since Ark prints its slot in place of the value. -->
    <template v-if="$slots.default" #default><slot /></template>
  </ProgressValueText>
</template>
