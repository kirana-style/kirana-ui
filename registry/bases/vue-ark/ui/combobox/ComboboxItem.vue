<script setup lang="ts">
import { ComboboxItem, ComboboxItemIndicator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// Base UI's `value`: the item itself, as the combobox's `items` hold it.
const { value } = defineProps<{ value: unknown }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    :item="value"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, combobox.item, sx]"
  >
    <slot />
    <ComboboxItemIndicator as-child>
      <span :sx="[menuIndicator, combobox.indicator]">
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </span>
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>
