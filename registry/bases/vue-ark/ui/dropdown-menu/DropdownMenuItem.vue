<script setup lang="ts">
// Ark names every item with `value`, which its select events report.
import { MenuItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import {
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false, variant = "default" } = defineProps<{
  inset?: boolean
  variant?: "default" | "destructive"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <MenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset || undefined"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[
      menuRowBase,
      menuRowPadding,
      variant === 'destructive' && menuRowDestructive,
      sx,
    ]"
  >
    <slot />
  </MenuItem>
</template>
