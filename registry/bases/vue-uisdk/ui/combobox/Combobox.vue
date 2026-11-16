<script setup lang="ts">
/**
 * ui-sdk's combobox, taking Base UI's API as Vue's Ark UI part does: `items` (strings, objects
 * with a `label` and `value`, or groups with their own `items`), which `ComboboxList` and
 * `ComboboxCollection` draw through their slot and ui-sdk filters as it is typed in; a value or a
 * list of them (`multiple`, `v-model`), in the shape the items were given; `autoHighlight`;
 * `itemToStringLabel` and `itemToStringValue`, ui-sdk's `itemToLabel` and `itemToValue`. Its
 * popup renders in the body, as Base UI's portal puts it.
 */
import { Combobox } from "@ui-sdk/vue/combobox"
import { computed, provide, reactive } from "vue"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"
import { ANCHORS, ITEMS } from "./context"
import type { ComboboxAnchors } from "./context"

const props = defineProps<{
  items?: readonly unknown[]
  defaultValue?: unknown
  /** `v-model`: one item (`null` for none), or a list in a `multiple` combobox. */
  modelValue?: unknown
  multiple?: boolean
  autoHighlight?: boolean
  disabled?: boolean
  // `any`: a caller's callback takes its own items' type, which `unknown` would refuse.
  itemToStringLabel?: (item: any) => string
  itemToStringValue?: (item: any) => string
}>()
const emit = defineEmits<{ "update:modelValue": [value: unknown] }>()

/** An item's label, as Base UI reads it: an object's `label`, else the item as text. */
const labelOf = (item: unknown) =>
  typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item)

provide(
  ITEMS,
  computed(() => props.items ?? [])
)
provide(
  ANCHORS,
  reactive<ComboboxAnchors>({ chips: null, input: null, trigger: null })
)
</script>

<template>
  <Combobox
    :container="popupContainer()"
    :multiple="multiple"
    :disabled="disabled"
    :auto-highlight="autoHighlight"
    :item-to-label="itemToStringLabel ?? labelOf"
    :item-to-value="itemToStringValue"
    :default-value="defaultValue"
    :value="modelValue"
    v-bind="$attrs"
    @update:value="(value: unknown) => emit('update:modelValue', value)"
  >
    <slot />
  </Combobox>
</template>
