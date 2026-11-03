<script setup lang="ts">
/**
 * Ark's select is built from a collection: pass `items` as Base UI's select takes them (an entry
 * whose `value` is `null` is the placeholder), or a `collection` of your own
 * (`createListCollection`). Each `SelectItem` names its entry by `value`, or with `item`. A hidden
 * native select carries the value in a form.
 */
import {
  SelectHiddenSelect,
  SelectRoot,
  createListCollection,
  useLocaleContext,
} from "@ark-ui/vue"
import type { ListCollection } from "@ark-ui/vue"
import { computed, provide, ref } from "vue"
import type { PropType } from "vue"

import { positioning as place } from "../../../../lib/placement"
import type { PlacementProps } from "../../../../lib/placement"
import { select } from "../../../../styles/select.styles"
import { PLACEHOLDER, REGISTER } from "./placeholder"
import { PLACEMENT } from "./placement"

defineOptions({ inheritAttrs: false })

// A runtime declaration, so a project's type checker sees the props, while Vue's compiler resolves
// no imported type (it would through TypeScript's JavaScript API, which TypeScript 7 lacks).
const props = defineProps({
  items: {
    type: Array as PropType<
      readonly { label: string; value: string | null; disabled?: boolean }[]
    >,
    default: undefined,
  },
  collection: {
    // `any`: a caller's collection is of its own items, which `unknown` would refuse.
    type: Object as PropType<ListCollection<any>>,
    default: undefined,
  },
  /** Base UI's: one value, or several in a `multiple` select. */
  defaultValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  /** `v-model`: one value (`null` for none), or several in a `multiple` select, as Base UI's. */
  modelValue: {
    type: [String, Array, null] as PropType<string | string[] | null>,
    default: undefined,
  },
})
const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | null]
}>()

// Without `items` or a `collection`, the items are read from the markup, as Base UI's are: each
// `SelectItem` registers its value and text.
type Entry = { label: string; value: string | null; disabled?: boolean }
const registered = ref<Entry[]>([])
provide(REGISTER, (entry: Entry) => {
  if (props.items || props.collection) return
  if (!registered.value.some((known) => known.value === entry.value))
    registered.value = [...registered.value, entry]
})

const collection = computed(
  () =>
    props.collection ??
    createListCollection({
      // The placeholder's entry is the empty value, which clears the select as Base UI's does.
      items: props.items ?? registered.value,
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value ?? "",
      isItemDisabled: (item) => !!item.disabled,
    })
)
provide(
  PLACEHOLDER,
  computed(() => props.items?.find((item) => item.value === null)?.label)
)
// The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
const placement = ref<PlacementProps>({})
provide(PLACEMENT, placement)
const locale = useLocaleContext()
const positioning = computed(() =>
  place(placement.value, { rtl: locale?.value?.dir === "rtl" })
)
const list = (value: string | string[] | null | undefined) =>
  value === null ? [] : typeof value === "string" ? [value] : value
const defaultValue = computed(() => list(props.defaultValue))
const modelValue = computed(() =>
  props.modelValue === undefined ? undefined : list(props.modelValue)
)
/** A value reported in the shape the caller gave it: one, or the list. */
const report = (value: string[]) =>
  Array.isArray(props.modelValue) || Array.isArray(props.defaultValue)
    ? value
    : (value[0] ?? null)
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
  <SelectRoot
    lazy-mount
    unmount-on-exit
    :collection="collection"
    :default-value="defaultValue"
    :model-value="modelValue"
    :positioning="positioning"
    :sx="select.rootArk"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', report($event))"
  >
    <slot />
    <SelectHiddenSelect />
  </SelectRoot>
</template>
