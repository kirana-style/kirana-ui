<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="trace" v-bind="attrs" :sx="[trace.root, sx]">
    <slot />
  </div>
</template>
