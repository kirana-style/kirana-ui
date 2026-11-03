<script setup lang="ts">
import { MenuItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { useId } from "vue"

import {
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// Ark names every item with `value`, which its select events report; one without it gets its own.
const {
  value,
  inset = false,
  variant = "default",
} = defineProps<{
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
}>()
const { sx, attrs } = useSx()
const id = useId()
</script>

<template>
  <MenuItem
    data-slot="dropdown-menu-item"
    :value="value ?? id"
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
