<script setup lang="ts">
import { MenuItemIndicator, MenuRadioItem } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { value, inset } = defineProps<{ value: string; inset?: boolean }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuRadioItem"
    name="dropdown-menu-radio-item"
    tag="div"
    :close-on-select="false"
    :value="value"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
  >
    <span data-slot="dropdown-menu-radio-item-indicator" :sx="menuIndicator">
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
  </UisdkPart>
</template>
