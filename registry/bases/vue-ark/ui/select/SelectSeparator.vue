<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

// Ark's select has no separator part: a rule between groups, as the others draw it.
import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    role="separator"
    data-slot="select-separator"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  />
</template>
