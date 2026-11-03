<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"
import { Collapsible } from "../collapsible"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Collapsible
    data-slot="trace-collapsible"
    v-bind="attrs"
    :sx="[trace.collapsible, sx]"
  >
    <slot />
  </Collapsible>
</template>
