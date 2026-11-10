<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

// A rule between groups, as the others draw it.
import { menuSeparator } from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    role="separator"
    data-slot="select-separator"
    v-bind="attrs"
    :sx="[menuSeparator, select.separator, sx]"
  />
</template>
