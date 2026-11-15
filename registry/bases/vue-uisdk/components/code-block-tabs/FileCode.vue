<script setup lang="ts">
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../../lib/vue/use-highlighted-code"
import { CodeBlockContent, CodeBlockLine } from "../../ui/code-block"

const { code, language } = defineProps<{
  code: string
  language: string
}>()
const lines = useHighlightedCode(code, language)
</script>

<template>
  <CodeBlockContent line-numbers>
    <CodeBlockLine v-for="(line, index) in lines" :key="index">
      <HighlightedLine :tokens="line" />
    </CodeBlockLine>
  </CodeBlockContent>
</template>
