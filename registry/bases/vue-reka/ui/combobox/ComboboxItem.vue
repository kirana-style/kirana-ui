<script setup lang="ts">
import { ComboboxItem, ComboboxItemIndicator } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

// Base UI's `value`: the item itself, as the combobox's `items` hold it; Reka's is its value string.
const { value } = defineProps<{ value: unknown }>()
const { sx, attrs } = useSx()
const context = useCombobox()
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    :value="context.value(value)"
    :text-value="context.label(value)"
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
