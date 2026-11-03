<script setup lang="ts">
import { AccordionItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` is declared here and passed on, so a project's type checker sees it.
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    :value="value"
    v-bind="attrs"
    :sx="[accordion.item, sx]"
  >
    <slot />
  </AccordionItem>
</template>
