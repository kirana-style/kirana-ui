<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { typeset } from "../../../styles/typeset.styles"

const styles = {
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
  }),
}

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`

const lines = useHighlightedCode(code, "ts")
</script>

<template>
  <div :sx="page.example">
    <div class="typeset" :sx="[typeset, styles.div]">
      <h3>Stream a response</h3>
      <p>
        Create a route handler that calls
        <code> streamText </code>
        and returns the stream to the client.
      </p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <IconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="File01Icon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            />app/api/chat/route.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton :value="code" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent line-numbers>
          <CodeBlockLine v-for="(line, index) in lines" :key="index">
            <HighlightedLine :tokens="line" />
          </CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
      <p>
        The
        <code> useChat </code>
        hook reads the stream on the client and renders the answer while it is
        written.
      </p>
    </div>
  </div>
</template>
