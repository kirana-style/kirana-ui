<script setup lang="ts">
import { SelectLabel } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectLabel data-slot="select-label" v-bind="attrs" :sx="[menuLabel, sx]">
    <slot />
  </SelectLabel>
</template>
