<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, select.item, sx]"
  >
    <SelectItemText :sx="select.itemText">
      <slot />
    </SelectItemText>
    <SelectItemIndicator :sx="[menuIndicator, select.indicator]">
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </SelectItemIndicator>
  </SelectItem>
</template>
