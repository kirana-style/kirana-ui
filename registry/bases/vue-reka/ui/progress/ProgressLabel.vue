<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

// Reka has no label part: the element Base UI's label renders.
const { sx, attrs } = useSx()
</script>

<template>
  <span data-slot="progress-label" v-bind="attrs" :sx="[progress.label, sx]">
    <slot />
  </span>
</template>
