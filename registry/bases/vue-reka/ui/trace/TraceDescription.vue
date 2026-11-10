<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="trace-description"
    v-bind="attrs"
    :sx="[trace.description, sx]"
  >
    <slot />
  </span>
</template>
