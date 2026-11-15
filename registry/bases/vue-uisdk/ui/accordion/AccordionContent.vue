<script setup lang="ts">
import { AccordionPanel } from "@ui-sdk/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AccordionPanel"
    name="accordion-content"
    tag="div"
    v-bind="attrs"
    :sx="[accordion.content, accordion.contentBase]"
  >
    <div :sx="[accordion.contentInner, accordion.contentInnerBase, sx]">
      <slot />
    </div>
  </UisdkPart>
</template>
