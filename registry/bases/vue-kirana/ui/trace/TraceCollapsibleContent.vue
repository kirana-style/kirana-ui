<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { trace } from "../../../../styles/trace.styles"
import { CollapsibleContent } from "../collapsible"

defineOptions({ inheritAttrs: false })

const { keepMounted = false } = defineProps<{
  /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
  keepMounted?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    :keep-mounted="keepMounted"
    v-bind="attrs"
    :sx="trace.content"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :sx="[trace.contentInner, sx]"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
