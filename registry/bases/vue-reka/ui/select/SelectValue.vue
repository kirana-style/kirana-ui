<script setup lang="ts">
import { injectSelectRootContext, SelectValue } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { select } from "../../../../styles/select.styles"
import { SELECT } from "./context"

defineOptions({ inheritAttrs: false })

const { placeholder } = defineProps<{ placeholder?: string }>()
const { sx, attrs } = useSx()
const context = inject(SELECT, undefined)
const root = injectSelectRootContext()
/** The value as a list, as Vue's Ark UI parts give it, and the entries it names. */
const value = computed(() => {
  const current = root.modelValue.value
  if (current == null) return []
  return (Array.isArray(current) ? current : [current]) as string[]
})
// `any`: a caller's items are of its own type (an icon beside the label …), handed back as given.
const items = computed(
  () =>
    (context?.entries.value.filter(
      (entry) => entry.value !== null && value.value.includes(entry.value)
    ) ?? []) as any[]
)
</script>

<template>
  <SelectValue
    data-slot="select-value"
    :placeholder="placeholder ?? context?.placeholder.value"
    v-bind="attrs"
    :sx="[select.value, sx]"
  >
    <!-- What the trigger shows, as Base UI's render function: the value and its entries. Passed to
         Reka only when given, since Reka prints its slot in place of the chosen item's text. -->
    <template v-if="$slots.default" #default>
      <slot :value="value" :items="items" />
    </template>
  </SelectValue>
</template>
