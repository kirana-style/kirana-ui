<script setup lang="ts">
import { Radio, RadioIndicator } from "@ui-sdk/vue/radio"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Radio"
    slot-name="radio-group-item"
    tag="span"
    :value="value"
    v-bind="attrs"
    :sx="[radioGroup.item, sx]"
  >
    <UisdkPart
      :part="RadioIndicator"
      slot-name="radio-group-indicator"
      tag="span"
      :sx="radioGroup.indicator"
    >
      <span :sx="radioGroup.dot" />
    </UisdkPart>
  </UisdkPart>
</template>
