<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { Comment, Text, useSlots } from "vue"
import type { VNode } from "vue"

import { codeBlock } from "../../../../styles/code-block.styles"

defineOptions({ inheritAttrs: false })

const { variant = "default" } = defineProps<{
  variant?: "default" | "added" | "removed" | "highlighted"
}>()
const { sx, attrs } = useSx()
const slots = useSlots()

// An empty line holds a newline so copying a selection keeps blank lines.
function empty() {
  const nodes = (slots.default?.() ?? []).filter(
    (node: VNode) => node.type !== Comment
  )
  return nodes.every(
    (node: VNode) => node.type === Text && String(node.children) === ""
  )
}
</script>

<template>
  <span
    data-slot="code-block-line"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[codeBlock.line, sx]"
  >
    <span data-slot="code-block-line-content" :sx="codeBlock.lineContent">
      <template v-if="empty()">{{ "\n" }}</template>
      <slot v-else />
    </span>
  </span>
</template>
