<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
} from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value?: string | null }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectItem"
    name="select-item"
    tag="div"
    :value="value ?? undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, select.item, sx]"
  >
    <UisdkPart
      :part="SelectItemText"
      name="select-item-text"
      tag="span"
      :sx="select.itemText"
    >
      <slot />
    </UisdkPart>
    <SelectItemIndicator :sx="[menuIndicator, select.indicator]">
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </SelectItemIndicator>
  </UisdkPart>
</template>
