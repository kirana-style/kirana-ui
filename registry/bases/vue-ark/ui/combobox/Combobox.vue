<script setup lang="ts">
/**
 * Ark UI's combobox, taking Base UI's API: `items` (strings, objects with a `label` and `value`,
 * or groups with their own `items`), filtered by what is typed as Base UI's are, with
 * `ComboboxList` and `ComboboxCollection` drawing each match through their slot; a value or a
 * list of them (`multiple`), in the shape the items were given; `autoHighlight`.
 */
import {
  ComboboxRoot,
  createListCollection,
  useLocaleContext,
} from "@ark-ui/vue"
import { computed, provide, ref } from "vue"

import { positioning as place } from "../../../../lib/placement"
import type { PlacementProps } from "../../../../lib/placement"
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
const value = (item: unknown) =>
  props.itemToStringValue?.(item) ??
  (typeof item === "object" && item !== null && "value" in item
    ? String((item as { value: unknown }).value)
    : String(item))

const items = computed(() => props.items ?? [])
const leaves = computed(() =>
  items.value.flatMap((item) => (isGroup(item) ? item.items : [item]))
)

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

const collection = computed(() =>
  createListCollection({
    items: leaves.value.filter(matches),
    itemToString: label,
    itemToValue: value,
  })
)

const list = (v: unknown) =>
  v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]
const own = ref<unknown[]>(list(props.defaultValue))
const selected = computed(() =>
  props.modelValue === undefined ? own.value : list(props.modelValue)
)
function report(values: string[]) {
  const chosen = values
    .map((v) => leaves.value.find((item) => value(item) === v))
    .filter((item) => item !== undefined)
  own.value = chosen
  emit("update:modelValue", props.multiple ? chosen : (chosen[0] ?? null))
}
// Opened, Base UI's single combobox highlights its chosen item; Ark's highlights none.
const highlighted = ref<string | null>(null)
function opened(open: boolean) {
  if (open)
    highlighted.value =
      !props.multiple && selected.value[0] !== undefined
        ? value(selected.value[0])
        : null
}

const remove = (item: unknown) =>
  report(selected.value.filter((s) => s !== item).map(value))

// The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
const placement = ref<PlacementProps>({})
const locale = useLocaleContext()
const positioning = computed(() =>
  place(placement.value, { rtl: locale?.value?.dir === "rtl" })
)

provide(COMBOBOX, {
  filtered,
  filter,
  label,
  value,
  selected,
  remove,
  chips: ref(false),
  placement,
})
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does. -->
  <ComboboxRoot
    lazy-mount
    unmount-on-exit
    :collection="collection"
    :model-value="selected.map(value)"
    :default-input-value="
      !multiple && selected[0] !== undefined ? label(selected[0]) : undefined
    "
    :multiple="multiple"
    :disabled="disabled"
    :input-behavior="autoHighlight ? 'autohighlight' : 'none'"
    :selection-behavior="multiple ? 'clear' : 'replace'"
    :positioning="positioning"
    open-on-click
    :highlighted-value="highlighted ?? undefined"
    :sx="combobox.rootArk"
    v-bind="$attrs"
    @update:model-value="report"
    @open-change="(d: { open: boolean }) => opened(d.open)"
    @highlight-change="
      (d: { highlightedValue: string | null }) =>
        (highlighted = d.highlightedValue)
    "
    @input-value-change="
      (d: { inputValue: string; reason?: string }) =>
        (query = d.reason === 'input-change' ? d.inputValue : '')
    "
  >
    <slot />
  </ComboboxRoot>
</template>
