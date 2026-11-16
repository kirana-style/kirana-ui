<script setup lang="ts">
import { ComboboxItem, ComboboxItemIndicator } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
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
  <UisdkPart
    :part="ComboboxItem"
    slot-name="combobox-item"
    tag="div"
    :value="value"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, combobox.item, sx]"
  >
    <slot />
    <ComboboxItemIndicator>
      <template #render="{ props: own, children }">
        <span v-bind="own" :sx="[menuIndicator, combobox.indicator]">
          <component :is="children" />
        </span>
      </template>
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </ComboboxItemIndicator>
  </UisdkPart>
</template>
