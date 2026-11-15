<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <p data-slot="field-description" v-bind="attrs" :sx="[field.description, sx]">
    <slot />
  </p>
</template>
