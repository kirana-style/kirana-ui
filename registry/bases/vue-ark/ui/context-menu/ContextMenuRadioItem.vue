<script setup lang="ts">
import { MenuItemIndicator, MenuRadioItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { contextMenu } from "../../../../styles/context-menu.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` is declared here and passed on, so a project's type checker sees it.
const { value, inset = false } = defineProps<{
  value: string
  inset?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <MenuRadioItem
    data-slot="context-menu-radio-item"
    :close-on-select="false"
    :value="value"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, sx]"
  >
    <span :sx="contextMenu.indicator">
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
