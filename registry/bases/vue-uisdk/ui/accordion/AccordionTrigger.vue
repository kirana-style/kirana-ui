<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from "@ui-sdk/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- ui-sdk's header (an `h3`), as Base UI's. -->
  <AccordionHeader :sx="accordion.header">
    <UisdkPart
      :part="AccordionTrigger"
      name="accordion-trigger"
      tag="button"
      v-bind="attrs"
      :sx="[accordion.trigger, sx]"
    >
      <slot />
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        data-slot="accordion-trigger-icon"
        :sx="accordion.iconClosed"
      />
      <IconPlaceholder
        lucide="ChevronUpIcon"
        tabler="IconChevronUp"
        hugeicons="ArrowUp01Icon"
        phosphor="CaretUpIcon"
        remixicon="RiArrowUpSLine"
        data-slot="accordion-trigger-icon"
        :sx="accordion.iconOpen"
      />
    </UisdkPart>
  </AccordionHeader>
</template>
