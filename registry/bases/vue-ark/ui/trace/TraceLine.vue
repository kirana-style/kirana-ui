<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"

defineOptions({ inheritAttrs: false })

const { status } = defineProps<{
  status?: "running" | "error" | "pending"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="trace-line"
    :data-status="status"
    v-bind="attrs"
    :sx="[trace.line, sx]"
  >
    <slot />
  </span>
</template>
