<script setup lang="ts">
import { MenuCheckboxItem, MenuItemIndicator } from "@ark-ui/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { useStyleAttrs } from "../../../../lib/vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const bound = useStyleAttrs(() => [menuRowBase, menuCheckableRowPadding])
</script>

<template>
  <MenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    :data-inset="inset || undefined"
    v-bind="bound"
  >
    <span data-slot="dropdown-menu-checkbox-item-indicator" :sx="menuIndicator">
      <MenuItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </MenuItemIndicator>
    </span>
    <slot />
  </MenuCheckboxItem>
</template>
