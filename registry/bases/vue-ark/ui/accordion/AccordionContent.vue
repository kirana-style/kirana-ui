<script setup lang="ts">
import { AccordionItemContent } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AccordionItemContent
    data-slot="accordion-content"
    v-bind="attrs"
    :sx="[accordion.content, accordion.contentArk]"
  >
    <div :sx="[accordion.contentInner, sx]">
      <slot />
    </div>
  </AccordionItemContent>
</template>
