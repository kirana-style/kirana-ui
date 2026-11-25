<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="steps-description"
    v-bind="attrs"
    :sx="[steps.description, sx]"
  >
    <slot />
  </span>
</template>
