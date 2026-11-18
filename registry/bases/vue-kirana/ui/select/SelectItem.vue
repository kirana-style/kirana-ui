<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

// Its entry: Base UI's `value` (`null` for the placeholder's), or an `item` with a `value`.
const { item, value } = defineProps<{
  item?: { value: string | null }
  value?: string | null
}>()
const { sx, attrs } = useSx()
const own = computed(() => item?.value ?? value ?? null)
</script>

<template>
  <Select.Item
    data-slot="select-item"
    :value="own"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, select.item, sx]"
  >
    <Select.ItemText :sx="select.itemText">
      <slot />
    </Select.ItemText>
    <Select.ItemIndicator :sx="[menuIndicator, select.indicator]">
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </Select.ItemIndicator>
  </Select.Item>
</template>
