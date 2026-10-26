<script setup lang="ts">
import { MenuCheckboxItem, MenuItemIndicator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` and `checked` are declared here and passed on, so a project's type checker
// sees them; `v-model:checked`'s listener reaches Ark through the attributes.
const {
  value,
  checked,
  inset = false,
} = defineProps<{ value: string; checked: boolean; inset?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <MenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    :value="value"
    :checked="checked"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
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
