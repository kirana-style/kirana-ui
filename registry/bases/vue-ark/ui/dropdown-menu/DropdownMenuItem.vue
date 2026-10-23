<script setup lang="ts">
// Ark names every item with `value`, which its select events report.
import { MenuItem } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
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
const bound = useStyleAttrs(() => [
  menuRowBase,
  menuRowPadding,
  variant === "destructive" && menuRowDestructive,
])
</script>

<template>
  <MenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset || undefined"
    :data-variant="variant"
    v-bind="bound"
  >
    <slot />
  </MenuItem>
</template>
