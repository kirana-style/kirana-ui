<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { select } from "../../../../styles/select.styles"
import { SELECT } from "./context"

defineOptions({ inheritAttrs: false })

const { placeholder } = defineProps<{ placeholder?: string }>()
const { sx, attrs } = useSx()
const context = inject(SELECT, undefined)
/** The chosen values as a list, and their items, as Vue's Ark UI parts hand their slot. */
const chosen = (value: unknown, values: readonly unknown[] | undefined) =>
  (values ?? (value == null ? [] : [value])) as string[]
// `any`: a caller's items are of its own type (an icon beside the label …), handed back as given.
const itemsOf = (values: string[]) =>
  (context?.entries.value.filter(
    (entry) => entry.value !== null && values.includes(entry.value)
  ) ?? []) as any[]
</script>

<template>
  <Select.Value
    data-slot="select-value"
    :placeholder="placeholder ?? context?.placeholder.value"
    v-bind="attrs"
    :sx="[select.value, sx]"
  >
    <!-- What the trigger shows, as Base UI's render function: the value and its entries; the
         part's own label when the caller gives no slot. -->
    <template v-if="$slots.default" #default="{ value, values }">
      <slot
        :value="chosen(value, values)"
        :items="itemsOf(chosen(value, values))"
      />
    </template>
  </Select.Value>
</template>
