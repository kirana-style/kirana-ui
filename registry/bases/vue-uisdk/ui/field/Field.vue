<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "vertical" | "horizontal" | "responsive"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="field"
    role="group"
    :data-orientation="orientation"
    v-bind="attrs"
    :sx="[field.root, sx]"
  >
    <slot />
  </div>
</template>
