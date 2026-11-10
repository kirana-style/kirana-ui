<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, useSlots } from "vue"
import type { VNode } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"
import { SELECT } from "./context"

defineOptions({ inheritAttrs: false })

// Its entry: Base UI's `value` (`null` for the placeholder's), or an `item` with a `value`.
const { item, value } = defineProps<{
  item?: { value: string | null }
  value?: string | null
}>()
const { sx, attrs } = useSx()

/** The text of what the item draws, which the select's value slot gets among its items. */
const textOf = (nodes: VNode[] = []): string =>
  nodes
    .map((node) =>
      typeof node.children === "string"
        ? node.children
        : Array.isArray(node.children)
          ? textOf(node.children as VNode[])
          : ""
    )
    .join("")
    .trim()
const slots = useSlots()
const own = computed(() => item?.value ?? value ?? null)
inject(SELECT, undefined)?.register({
  value: own.value,
  label: textOf(slots.default?.()),
  disabled: attrs.value.disabled === true || attrs.value.disabled === "",
})
</script>

<template>
  <SelectItem
    data-slot="select-item"
    :value="own"
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
