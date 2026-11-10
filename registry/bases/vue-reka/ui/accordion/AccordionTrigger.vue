<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AccordionHeader :sx="accordion.header">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="attrs"
      :sx="[accordion.trigger, sx]"
    >
      <slot />
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        data-slot="accordion-trigger-icon"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="accordion.iconClosed"
      />
      <IconPlaceholder
        lucide="ChevronUpIcon"
        tabler="IconChevronUp"
        data-slot="accordion-trigger-icon"
        hugeicons="ArrowUp01Icon"
        phosphor="CaretUpIcon"
        remixicon="RiArrowUpSLine"
        :sx="accordion.iconOpen"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
