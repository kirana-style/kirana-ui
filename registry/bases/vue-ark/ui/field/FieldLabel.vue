<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"
import { Label } from "../label"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Label data-slot="field-label" v-bind="attrs" :sx="[field.label, sx]">
    <slot />
  </Label>
</template>
