<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { computed, provide, ref } from "vue"

import { COMBOBOX } from "./context"

/**
 * Kirana UI's combobox, with Base UI's items-driven API as Vue's Ark UI parts take it: `items` go
 * to the list's slot (Kirana UI filters the items by their text), and their labels to Kirana UI's
 * `items`, so the input shows a chosen item before the list opens; `multiple` makes `v-model` and
 * `default-value` lists. The values are the items themselves.
 */
const props = defineProps<{
  items?: readonly unknown[]
  defaultValue?: unknown
  modelValue?: unknown
  multiple?: boolean
  autoHighlight?: boolean
  disabled?: boolean
  itemToStringLabel?: (item: any) => string
  /** Base UI's object values' keys: Kirana UI compares values itself, so taken only. */
  itemToStringValue?: (item: any) => string
}>()
const emit = defineEmits<{ "update:modelValue": [value: unknown] }>()

const isGroup = (item: unknown): item is { items: unknown[] } =>
  typeof item === "object" &&
  item !== null &&
  Array.isArray((item as { items?: unknown }).items)
const label = (item: unknown) =>
  props.itemToStringLabel?.(item) ??
  (typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item))
const items = computed(() => props.items ?? [])
const leaves = computed(() =>
  items.value.flatMap((item) => (isGroup(item) ? item.items : [item]))
)
const labels = computed(() =>
  leaves.value.map((item) => ({ value: item, label: label(item) }))
)
const list = (v: unknown) =>
  v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]
// What `ComboboxValue` hands its slot: the caller's while controlled, else the last chosen.
const own = ref<unknown[]>(list(props.defaultValue))
const selected = computed(() =>
  props.modelValue === undefined ? own.value : list(props.modelValue)
)
const report = (value: unknown) => {
  own.value = list(value)
  emit("update:modelValue", value)
}
provide(COMBOBOX, { items, label, selected })
</script>

<template>
  <Combobox.Root
    v-if="multiple"
    multiple
    :items="labels"
    :default-value="list(defaultValue)"
    :value="modelValue === undefined ? undefined : list(modelValue)"
    :auto-highlight="autoHighlight"
    :disabled="disabled"
    @value-change="report"
  >
    <slot />
  </Combobox.Root>
  <Combobox.Root
    v-else
    :items="labels"
    :default-value="defaultValue"
    :value="modelValue"
    :auto-highlight="autoHighlight"
    :disabled="disabled"
    @value-change="report"
  >
    <slot />
  </Combobox.Root>
</template>
