<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useSelectContext,
} from "@ark-ui/vue"
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
import { REGISTER } from "./placeholder"

defineOptions({ inheritAttrs: false })

// Its entry of the select's collection: `item`, or the one Base UI's `value` names. `unknown`: a
// caller's items are of its own type.
const { item, value } = defineProps<{ item?: unknown; value?: string | null }>()
const { sx, attrs } = useSx()
const context = useSelectContext()

/** The text of what the item draws, which the select shows once it is chosen. */
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
const own = {
  value: value ?? null,
  label: textOf(slots.default?.()),
  disabled: attrs.value.disabled === true || attrs.value.disabled === "",
}
inject(REGISTER, undefined)?.(own)

// Until its registration reaches the collection, an item read from the markup is its own entry.
const entry = computed(
  () => item ?? context.value.collection.find(value ?? "") ?? own
)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    :item="entry"
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
