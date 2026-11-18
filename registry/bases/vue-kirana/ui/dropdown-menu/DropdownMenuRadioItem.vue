<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// The item's required `value`, declared here and passed on, so a project's type checker sees it.
const {
  value,
  inset = false,
  closeOnSelect = false,
} = defineProps<{
  value: string
  inset?: boolean
  /** Closes the menu when chosen, as Ark UI's `close-on-select`; Base UI's stays open. */
  closeOnSelect?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Stays open when chosen, as Base UI's, unless `close-on-select`. -->
  <Menu.RadioItem
    data-slot="dropdown-menu-radio-item"
    :value="value"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
    :close-on-click="closeOnSelect"
  >
    <span data-slot="dropdown-menu-radio-item-indicator" :sx="menuIndicator">
      <Menu.RadioItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </Menu.RadioItemIndicator>
    </span>
    <slot />
  </Menu.RadioItem>
</template>
