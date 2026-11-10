<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { trace } from "../../../../styles/trace.styles"
import { CollapsibleContent } from "../collapsible"
import { KEEP_MOUNTED } from "./keep-mounted"

defineOptions({ inheritAttrs: false })

const { keepMounted = false } = defineProps<{
  /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
  keepMounted?: boolean
}>()
const { sx, attrs } = useSx()
const keep = inject(KEEP_MOUNTED, undefined)
if (keep && keepMounted) keep.value = true
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
