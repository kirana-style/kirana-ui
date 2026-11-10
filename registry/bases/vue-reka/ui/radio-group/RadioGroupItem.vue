<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

// Reka's required `value`, declared here and passed on. The item is the radio itself, so its `id`
// is the one a `<Label for>` beside it names, and an `aria-invalid` lands on it.
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
// A `span`, as Base UI's radio, where Reka draws a button: Reka's roving focus makes it focusable,
// and Space presses it as Base UI's.
const press = (event: KeyboardEvent) =>
  (event.currentTarget as HTMLElement).click()
</script>

<template>
  <RadioGroupItem
    as="span"
    data-slot="radio-group-item"
    :value="value"
    v-bind="attrs"
    :sx="[radioGroup.item, sx]"
    @keydown.space.prevent="press"
  >
    <RadioGroupIndicator as-child>
      <span data-slot="radio-group-indicator" :sx="radioGroup.indicator">
        <span :sx="radioGroup.dot" />
      </span>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
