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

// Ark's required `item`, an entry of the select's collection, declared here and passed on, so a
// project's type checker sees it. `unknown`: a caller's items are of its own type.
const { item } = defineProps<{ item: unknown }>()
const { sx, attrs } = useSx()
</script>

<template>
  <SelectItem
    data-slot="select-item"
    :item="item"
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
