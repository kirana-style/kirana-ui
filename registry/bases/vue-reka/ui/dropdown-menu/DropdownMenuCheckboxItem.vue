<script setup lang="ts">
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// `v-model:checked`, or `defaultChecked` for an item that keeps its own, as Base UI's. `value` is
// accepted for markup written for Ark UI, which names its items; Reka's need none.
const {
  defaultChecked = false,
  inset = false,
  closeOnSelect = false,
} = defineProps<{
  value?: string
  defaultChecked?: boolean
  inset?: boolean
  /** Closes the menu when chosen, as Ark UI's `close-on-select`; Base UI's stays open. */
  closeOnSelect?: boolean
}>()
// `null` while the caller keeps none: a boolean model would read an absent one as `false`.
const checked = defineModel<boolean | null>("checked", { default: null })
const own = ref(defaultChecked)
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Stays open when chosen, as Base UI's: Reka closes on `select` unless it is prevented. -->
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    :model-value="checked ?? own"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
    @update:model-value="
      (next: boolean | 'indeterminate') => (
        (own = next === true),
        (checked = next === true)
      )
    "
    @select="(event: Event) => closeOnSelect || event.preventDefault()"
  >
    <span data-slot="dropdown-menu-checkbox-item-indicator" :sx="menuIndicator">
      <DropdownMenuItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
