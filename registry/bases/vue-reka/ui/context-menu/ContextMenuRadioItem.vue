<script setup lang="ts">
import { ContextMenuItemIndicator, ContextMenuRadioItem } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { contextMenu } from "../../../../styles/context-menu.styles"
import {
  menuCheckableRowPadding,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// Reka's required `value` is declared here and passed on, so a project's type checker sees it.
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
  <!-- Stays open when chosen, as Base UI's: Reka closes on `select` unless it is prevented. -->
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    :value="value"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, sx]"
    @select="(event: Event) => closeOnSelect || event.preventDefault()"
  >
    <span :sx="contextMenu.indicator">
      <ContextMenuItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
