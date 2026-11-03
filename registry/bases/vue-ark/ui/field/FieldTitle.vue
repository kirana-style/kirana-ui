<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="field-label" v-bind="attrs" :sx="[field.title, sx]">
    <slot />
  </div>
</template>
