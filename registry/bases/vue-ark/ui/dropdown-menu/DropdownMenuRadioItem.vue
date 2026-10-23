<script setup lang="ts">
import { MenuItemIndicator, MenuRadioItem } from "@ark-ui/vue"

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
  <MenuRadioItem
    data-slot="dropdown-menu-radio-item"
    :data-inset="inset || undefined"
    v-bind="bound"
  >
    <span data-slot="dropdown-menu-radio-item-indicator" :sx="menuIndicator">
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
  </MenuRadioItem>
</template>
