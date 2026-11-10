<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { separator } from "../../../../styles/separator.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "horizontal" } = defineProps<{
  orientation?: "horizontal" | "vertical"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="separator"
    role="separator"
    :aria-orientation="orientation"
    :data-orientation="orientation"
    v-bind="attrs"
    :sx="[separator, sx]"
  />
</template>
