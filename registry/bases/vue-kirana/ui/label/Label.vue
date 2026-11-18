<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { label } from "../../../../styles/label.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <label data-slot="label" v-bind="attrs" :sx="[label, sx]">
    <slot />
  </label>
</template>
