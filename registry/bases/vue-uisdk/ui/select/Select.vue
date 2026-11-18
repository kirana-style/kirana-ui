<script setup lang="ts">
import { Select } from "@ui-sdk/vue/select"
import { computed, provide } from "vue"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"
import type { Entry } from "./context"
import { ITEMS } from "./context"

/**
 * ui-sdk's select, with Vue's Ark UI part's props: `items` (an entry of value `null` is the
 * placeholder, which ui-sdk reads from `placeholder`), `default-value` and `v-model`, one value
 * (`null` for none) or several with `multiple`. Its popup renders in the body, as Base UI's portal
 * puts it.
 */
const {
  items,
  defaultValue,
  multiple = false,
} = defineProps<{
  items?: readonly Entry[]
  defaultValue?: string | string[]
  multiple?: boolean
}>()
const value = defineModel<string | string[] | null | undefined>({
  default: undefined,
})
provide(ITEMS, () => items)
const list = computed(() =>
  items
    ?.filter((item) => item.value !== null)
    .map((item) => ({
      value: item.value as string,
      label: item.label,
      disabled: item.disabled,
    }))
)
const placeholder = computed(
  () => items?.find((item) => item.value === null)?.label
)
// ui-sdk types the value by `multiple`, one signature each and a third for a `multiple` only known
// when it runs. vue-tsc 3.3, which an installed project gets, refuses these three bound one by one
// (3.2 passes them), so they are bound as one object it does not read against the select (LF-031).
const selection = computed<Record<string, unknown>>(() => ({
  multiple,
  defaultValue,
  modelValue: value.value,
}))
</script>

<template>
  <Select
    data-slot="select"
    :container="popupContainer()"
    :items="list"
    :placeholder="placeholder"
    v-bind="{ ...$attrs, ...selection }"
    @update:model-value="(next: string | string[] | null) => (value = next)"
  >
    <slot />
  </Select>
</template>
