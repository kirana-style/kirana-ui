<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <fieldset data-slot="field-set" v-bind="attrs" :sx="[field.set, sx]">
    <slot />
  </fieldset>
</template>
