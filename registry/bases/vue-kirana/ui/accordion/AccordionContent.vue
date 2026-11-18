<script setup lang="ts">
import { Accordion } from "@kirana-ui/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Base UI's panel variables, which Kirana UI's panel writes, as React's part reads them. -->
  <Accordion.Panel
    data-slot="accordion-content"
    v-bind="attrs"
    :sx="[accordion.content, accordion.contentBase]"
  >
    <div :sx="[accordion.contentInner, accordion.contentInnerBase, sx]">
      <slot />
    </div>
  </Accordion.Panel>
</template>
