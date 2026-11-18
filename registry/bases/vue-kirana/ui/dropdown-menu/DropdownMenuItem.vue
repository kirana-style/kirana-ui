<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import {
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// `value` is accepted for markup written for Ark UI, which names its items; Kirana UI's need none.
const { inset = false, variant = "default" } = defineProps<{
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Menu.Item
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
  </Menu.Item>
</template>
