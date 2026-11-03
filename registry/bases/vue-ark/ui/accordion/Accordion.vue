<script setup lang="ts">
import { AccordionRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A closed panel leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
  <AccordionRoot
    data-slot="accordion"
    lazy-mount
    unmount-on-exit
    v-bind="attrs"
    :sx="[accordion.root, sx]"
  >
    <slot />
  </AccordionRoot>
</template>
