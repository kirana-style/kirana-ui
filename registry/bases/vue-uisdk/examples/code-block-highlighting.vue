<script setup lang="ts">
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/vue/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
  }),
}

const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`

const lines = useHighlightedCode(code, "json")
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle> getWeather output</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          <CodeBlockLine v-for="(line, index) in lines" :key="index"
            ><HighlightedLine :tokens="line" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  </div>
</template>
