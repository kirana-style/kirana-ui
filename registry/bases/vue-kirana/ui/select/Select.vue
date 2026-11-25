<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { computed, provide } from "vue"
import type { PropType } from "vue"

import { SELECT } from "./context"

defineOptions({ inheritAttrs: false })

/**
 * Kirana UI's select, with Vue's Ark UI parts' props: `items` (an item of value `null` names the
 * placeholder), `v-model` and `default-value`, a list with `multiple`.
 */
// A runtime declaration, so a project's type checker sees the props, while Vue's compiler resolves
// no imported type (it would through TypeScript's JavaScript API, which TypeScript 7 lacks).
const props = defineProps({
  items: {
    type: Array as PropType<
      readonly { label: string; value: string | null; disabled?: boolean }[]
    >,
    default: undefined,
  },
  defaultValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  modelValue: {
    type: [String, Array, null] as PropType<string | string[] | null>,
    default: undefined,
  },
  multiple: { type: Boolean, default: false },
})
const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | null]
}>()
provide(SELECT, {
  entries: computed(() => props.items ?? []),
  placeholder: computed(
    () => props.items?.find((item) => item.value === null)?.label
  ),
  register: () => {},
})
const labels = computed(() =>
  props.items
    ?.filter((item) => item.value !== null)
    .map((item) => ({ value: item.value as string, label: item.label }))
)
const list = (value: string | string[] | null | undefined) =>
  value == null ? value : Array.isArray(value) ? value : [value]
</script>

<template>
  <Select.Root
    v-if="multiple"
    multiple
    :items="labels"
    :default-value="list(defaultValue) ?? undefined"
    :value="list(modelValue) ?? undefined"
    v-bind="$attrs"
    @value-change="
      (value: unknown) => emit('update:modelValue', value as string[])
    "
  >
    <slot />
  </Select.Root>
  <Select.Root
    v-else
    :items="labels"
    :default-value="defaultValue as string | undefined"
    :value="modelValue as string | null | undefined"
    v-bind="$attrs"
    @value-change="
      (value: unknown) => emit('update:modelValue', value as string | null)
    "
  >
    <slot />
  </Select.Root>
</template>
