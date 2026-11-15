<script setup lang="ts">
import { SelectValue } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { inject } from "vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { select } from "../../../../styles/select.styles"
import { ITEMS } from "./context"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's chosen label or placeholder; a slot draws the value itself, given it as a list and the
 * chosen entries of the root's `items`, as Vue's Ark UI part gives them.
 */
const { placeholder } = defineProps<{ placeholder?: string }>()
const items = inject(ITEMS, () => undefined)
const list = (value: unknown): string[] =>
  value === null || value === undefined
    ? []
    : Array.isArray(value)
      ? (value as string[])
      : [value as string]
const chosen = (value: unknown) =>
  (items() ?? []).filter((item) => list(value).includes(item.value as string))

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectValue"
    name="select-value"
    tag="span"
    :placeholder="placeholder"
    v-bind="attrs"
    :sx="[select.value, sx]"
  >
    <template v-if="$slots.default" #default="{ state }">
      <slot :value="list(state.value)" :items="chosen(state.value)" />
    </template>
  </UisdkPart>
</template>
