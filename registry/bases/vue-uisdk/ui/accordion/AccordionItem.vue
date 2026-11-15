<script setup lang="ts">
import { AccordionItem } from "@ui-sdk/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AccordionItem"
    name="accordion-item"
    tag="div"
    :value="value"
    v-bind="attrs"
    :sx="[accordion.item, sx]"
  >
    <slot />
  </UisdkPart>
</template>
