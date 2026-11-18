<script setup lang="ts">
import { RadioGroup } from "@kirana-ui/vue/radio-group"
import { useSx } from "@kirana-style/core/vue"

import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <RadioGroup.Item
    data-slot="radio-group-item"
    :value="value"
    v-bind="attrs"
    :sx="[radioGroup.item, sx]"
  >
    <RadioGroup.Indicator as-child>
      <span data-slot="radio-group-indicator" :sx="radioGroup.indicator">
        <span :sx="radioGroup.dot" />
      </span>
    </RadioGroup.Indicator>
  </RadioGroup.Item>
</template>
