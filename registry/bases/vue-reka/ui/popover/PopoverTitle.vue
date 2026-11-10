<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

// Reka's popover has no title part: the heading Base UI's title renders.
const { sx, attrs } = useSx()
</script>

<template>
  <h2 data-slot="popover-title" v-bind="attrs" :sx="[popover.title, sx]">
    <slot />
  </h2>
</template>
