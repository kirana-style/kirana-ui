<script setup lang="ts">
/**
 * Pass `items` as Base UI's select takes them (an entry whose `value` is `null` is the
 * placeholder), or let each `SelectItem` name its entry by `value`, as Base UI's are read from the
 * markup. Reka writes a hidden native select that carries the value in a form.
 */
import { SelectRoot } from "reka-ui"
import { computed, provide, ref } from "vue"
import type { PropType } from "vue"

import { SELECT } from "./context"
import type { Entry } from "./context"

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

const registered = ref<Entry[]>([])
provide(SELECT, {
  entries: computed(() => props.items ?? registered.value),
  placeholder: computed(
    () => props.items?.find((item) => item.value === null)?.label
  ),
  register: (entry: Entry) => {
    if (props.items) return
    if (!registered.value.some((known) => known.value === entry.value))
      registered.value = [...registered.value, entry]
  },
})
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs. -->
  <SelectRoot
    :default-value="defaultValue"
    :model-value="modelValue"
    v-bind="$attrs"
    @update:model-value="
      (value) => emit('update:modelValue', value as string | string[] | null)
    "
  >
    <slot />
  </SelectRoot>
</template>
