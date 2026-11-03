<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { variant = "legend" } = defineProps<{
  variant?: "legend" | "label"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <legend
    data-slot="field-legend"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[field.legend, sx]"
  >
    <slot />
  </legend>
</template>
