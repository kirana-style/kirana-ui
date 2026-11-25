<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span data-slot="steps-title" v-bind="attrs" :sx="[steps.title, sx]">
    <slot />
  </span>
</template>
