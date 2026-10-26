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

// Ark's required `value` is declared here and passed on, so a project's type checker sees it.
const {
  value,
  inset = false,
  variant = "default",
} = defineProps<{
  value: string
  inset?: boolean
  variant?: "default" | "destructive"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <MenuItem
    data-slot="dropdown-menu-item"
    :value="value"
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
