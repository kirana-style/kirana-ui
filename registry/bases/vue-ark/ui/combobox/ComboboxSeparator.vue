<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="combobox-separator"
    role="separator"
    aria-orientation="horizontal"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  />
</template>
