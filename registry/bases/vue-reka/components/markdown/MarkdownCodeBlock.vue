<script setup lang="ts">
import { computed, inject } from "vue"

import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../../lib/vue/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../../ui/code-block"
import { FENCE_OPEN } from "./context"

const props = defineProps<{ code: string; language: string }>()

// True while the closing fence has not arrived yet.
const open = inject(FENCE_OPEN, undefined)
const incomplete = computed(() => open?.value ?? false)
const lines = useHighlightedCode(
  () => props.code,
  () => props.language
)
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>{{ language || "text" }}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="code" :disabled="incomplete" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent line-numbers>
      <CodeBlockLine v-for="(line, index) in lines" :key="index">
        <HighlightedLine :tokens="line" />
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
