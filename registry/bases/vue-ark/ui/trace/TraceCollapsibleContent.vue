<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"
import { CollapsibleContent } from "../collapsible"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    v-bind="attrs"
    :sx="[trace.content, trace.contentArk]"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :sx="[trace.contentInner, sx]"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
