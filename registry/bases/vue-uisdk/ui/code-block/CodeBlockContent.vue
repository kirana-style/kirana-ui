<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { Text, useSlots } from "vue"
import type { VNode } from "vue"

import { codeBlock } from "../../../../styles/code-block.styles"
import CodeBlockLine from "./CodeBlockLine.vue"

defineOptions({ inheritAttrs: false })

const {
  wrap = false,
  lineNumbers = false,
  startLine = 1,
} = defineProps<{
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}>()
const { sx, attrs } = useSx()
const slots = useSlots()

/** The code's lines, when numbered and given as text; otherwise the slot draws them. */
function lines(): string[] | undefined {
  if (!lineNumbers) return undefined
  const nodes = slots.default?.() ?? []
  if (nodes.length !== 1 || (nodes[0] as VNode).type !== Text) return undefined
  return String((nodes[0] as VNode).children)
    .replace(/\n$/, "")
    .split("\n")
}
</script>

<template>
  <pre
    data-slot="code-block-content"
    :data-wrap="wrap || undefined"
    :data-numbered="lineNumbers || undefined"
    dir="ltr"
    tabindex="0"
    :style="{ counterReset: `line ${startLine - 1}` }"
    v-bind="attrs"
    :sx="[codeBlock.content, wrap && codeBlock.contentWrap, sx]"
  ><code data-slot="code-block-code" :sx="codeBlock.code"><template v-if="lines()"><CodeBlockLine v-for="(line, index) in lines()" :key="index">{{ line }}</CodeBlockLine></template><slot v-else /></code></pre>
</template>
