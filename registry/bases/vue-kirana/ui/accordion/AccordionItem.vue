<script setup lang="ts">
import { Accordion } from "@kirana-ui/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Accordion.Item
    data-slot="accordion-item"
    :value="value"
    v-bind="attrs"
    :sx="[accordion.item, sx]"
  >
    <slot />
  </Accordion.Item>
</template>
