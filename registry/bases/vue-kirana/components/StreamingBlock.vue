<script setup lang="ts">
// `code-block-streaming`'s block, a component of its own as React's file declares it beside the
// example: a code that grows, highlighted again as it does.
import { computed } from "vue"

import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/vue/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

export type StreamingBlockData = {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}

const { block, code } = defineProps<{
  block: StreamingBlockData
  code: string
}>()

const rows = computed(() => code.split("\n"))
// A diff row starts with +, - or a space. The marker is not part of the code.
const source = computed(() =>
  block.diff ? rows.value.map((row) => row.slice(1)).join("\n") : code
)
const lines = useHighlightedCode(source, () => block.language)

function variant(index: number) {
  if (block.diff) {
    const row = rows.value[index]
    return row?.startsWith("+")
      ? "added"
      : row?.startsWith("-")
        ? "removed"
        : "default"
  }
  return block.highlight?.includes(index) ? "highlighted" : "default"
}
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader v-if="block.title">
      <CodeBlockTitle>{{ block.title }}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton
          :value="source"
          :disabled="code.length < block.code.length"
        />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent :line-numbers="block.lineNumbers">
      <CodeBlockLine
        v-for="(line, index) in lines"
        :key="index"
        :variant="variant(index)"
      >
        <HighlightedLine :tokens="line" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
