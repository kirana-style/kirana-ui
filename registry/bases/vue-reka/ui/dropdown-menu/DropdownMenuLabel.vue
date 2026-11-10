<script setup lang="ts">
import { DropdownMenuLabel } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuLabel, menuLabelWeight, sx]"
  >
    <slot />
  </DropdownMenuLabel>
</template>
