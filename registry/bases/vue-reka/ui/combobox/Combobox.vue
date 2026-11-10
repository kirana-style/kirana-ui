<script setup lang="ts">
/**
 * Reka UI's combobox, taking Base UI's API: `items` (strings, objects with a `label` and `value`,
 * or groups with their own `items`), filtered by what is typed as Base UI's are, with
 * `ComboboxList` and `ComboboxCollection` drawing each match through their slot; a value or a
 * list of them (`multiple`), in the shape the items were given; `autoHighlight`. Reka's own filter
 * is off (`ignore-filter`): each item is a value string, mapped back to the caller's item.
 */
import { ComboboxRoot } from "reka-ui"
import { computed, nextTick, provide, ref, watch } from "vue"

import { combobox } from "../../../../styles/combobox.styles"
import { COMBOBOX } from "./context"

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

const isGroup = (item: unknown): item is { items: unknown[] } =>
  typeof item === "object" &&
  item !== null &&
  Array.isArray((item as { items?: unknown }).items)
const label = (item: unknown) =>
  props.itemToStringLabel?.(item) ??
  (typeof item === "object" && item !== null && "label" in item
    ? String((item as { label: unknown }).label)
    : String(item))
/**
 * An item's value string for Reka. Reka refuses an item whose value is empty (its empty value clears
 * the choice), where Base UI's items may be (upstream's "Select country"), so an empty one goes to
 * Reka as a stand-in; every lookup goes through here, both ways.
 */
const EMPTY = "\u0000empty"
const value = (item: unknown) => {
  const raw =
    props.itemToStringValue?.(item) ??
    (typeof item === "object" && item !== null && "value" in item
      ? String((item as { value: unknown }).value)
      : String(item))
  return raw === "" ? EMPTY : raw
}

const items = computed(() => props.items ?? [])
const leaves = computed(() =>
  items.value.flatMap((item) => (isGroup(item) ? item.items : [item]))
)
const labelOf = (v: string) => {
  const item = leaves.value.find((leaf) => value(leaf) === v)
  return item === undefined ? v : label(item)
}

// What is typed, while it is typed: an input showing the chosen item's label lists every item.
const query = ref("")
const matches = (item: unknown) =>
  label(item).toLowerCase().includes(query.value.trim().toLowerCase())
const filter = (pool: readonly unknown[]) => pool.filter(matches)
const filtered = computed(() =>
  items.value.flatMap((item) => {
    if (!isGroup(item)) return matches(item) ? [item] : []
    return filter(item.items).length ? [item] : []
  })
)

const list = (v: unknown) =>
  v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]
const own = ref<unknown[]>(list(props.defaultValue))
const selected = computed(() =>
  props.modelValue === undefined ? own.value : list(props.modelValue)
)
function report(values: unknown) {
  const chosen = list(values)
    .map((v) => leaves.value.find((item) => value(item) === v))
    .filter((item) => item !== undefined)
  own.value = chosen
  emit("update:modelValue", props.multiple ? chosen : (chosen[0] ?? null))
}
const remove = (item: unknown) =>
  report(selected.value.filter((s) => s !== item).map(value))

// Base UI's `autoHighlight`: the first match is highlighted as the person types.
const root = ref<{ highlightFirstItem?: () => void }>()
watch(query, (typed) => {
  if (props.autoHighlight && typed)
    void nextTick(() => root.value?.highlightFirstItem?.())
})

provide(COMBOBOX, {
  filtered,
  filter,
  label,
  value,
  labelOf,
  selected,
  remove,
  chips: ref(false),
  query,
})
</script>

<template>
  <!-- Reka's root is an element where Base UI renders none: it leaves the layout. Opened, a single
       combobox highlights its chosen item, as Base UI's (Reka's own). -->
  <ComboboxRoot
    ref="root"
    ignore-filter
    open-on-click
    reset-model-value-on-clear
    :model-value="
      multiple
        ? selected.map(value)
        : selected[0] !== undefined
          ? value(selected[0])
          : null
    "
    :multiple="multiple"
    :disabled="disabled"
    :sx="combobox.rootArk"
    v-bind="$attrs"
    @update:model-value="report"
  >
    <slot />
  </ComboboxRoot>
</template>
