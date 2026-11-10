<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="trace-icon"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[trace.icon, sx]"
  >
    <slot />
  </span>
</template>
