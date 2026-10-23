<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from "@ark-ui/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { useStyleAttrs } from "../../../../lib/vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => [
  menuRowBase,
  menuCheckableRowPadding,
  select.item,
])
</script>

<template>
  <SelectItem data-slot="select-item" v-bind="bound">
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
