<script setup lang="ts">
import { MenuCheckboxItem, MenuItemIndicator } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"
import { useId } from "vue"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { value, defaultChecked, inset } = defineProps<{
  value?: string
  defaultChecked?: boolean
  inset?: boolean
}>()
// `null` while the caller keeps none, as Ark UI's part types it.
const checked = defineModel<boolean | null>("checked", { default: null })
// Ark UI's item names itself when given no value; ui-sdk's needs one.
const id = useId()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuCheckboxItem"
    name="context-menu-checkbox-item"
    tag="div"
    :close-on-select="false"
    :value="value ?? id"
    :default-checked="defaultChecked"
    :checked="checked ?? undefined"
    @update:checked="(next: boolean) => (checked = next)"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
  >
    <span data-slot="context-menu-checkbox-item-indicator" :sx="menuIndicator">
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
