<script setup lang="ts">
import { SelectItemGroupLabel } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectItemGroupLabel
    data-slot="select-label"
    v-bind="attrs"
    :sx="[menuLabel, sx]"
  >
    <slot />
  </SelectItemGroupLabel>
</template>
