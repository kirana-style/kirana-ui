<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"
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
  <ContextMenu.Item
    data-slot="context-menu-item"
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
  </ContextMenu.Item>
</template>
