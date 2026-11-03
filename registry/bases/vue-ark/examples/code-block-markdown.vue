<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming"
import { computed } from "vue"

import { createChat, getMessageText } from "../../../lib/ai"
import { Markdown } from "../../../lib/vue/markdown"
import type { MarkdownComponents } from "../../../lib/vue/markdown"
import FenceOpen from "../components/code-block-markdown/FenceOpen.vue"
import MarkdownCode from "../components/code-block-markdown/MarkdownCode.vue"
import MarkdownPre from "../components/code-block-markdown/MarkdownPre.vue"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { css, select } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    minHeight: "28rem",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // Streamdown's `space-y-4 whitespace-normal`, around the reply's blocks.
  markdown: css({
    whiteSpace: "normal",
    [select.child(":not(:last-child)")]: { marginBottom: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const response = `Wrap the value in a \`useDebounce\` hook. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`

const chat = createChat()
  .user("How do I debounce a search input in React?")
  .assistant(({ writer }) => {
    writer.text(response)
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 30 })

const extensions = [streamingMarkdownExtension()]

const fenceOpen = (text: string) =>
  (text.match(/^ {0,3}(?:`{3,}|~{3,})/gm)?.length ?? 0) % 2 === 1

const components = {
  code: MarkdownCode,
  pre: MarkdownPre,
} satisfies MarkdownComponents

const { messages, sendMessage, status } = useChat({
  messages: transcript,
  transport,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)

function replay() {
  messages.value = []
  void sendMessage(question)
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <template v-for="message in messages" :key="message.id">
        <Message v-if="message.role === 'user'" align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>{{ getMessageText(message) }}</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message v-else>
          <MessageContent>
            <FenceOpen
              :value="
                busy &&
                message === messages.at(-1) &&
                fenceOpen(getMessageText(message))
              "
            >
              <div :sx="styles.markdown">
                <Markdown
                  :source="getMessageText(message)"
                  :components="components"
                  :extensions="extensions"
                />
              </div>
            </FenceOpen>
          </MessageContent>
        </Message>
      </template>
      <Button
        v-if="!busy"
        variant="outline"
        size="sm"
        :sx="styles.button"
        @click="replay"
      >
        Replay
      </Button>
    </div>
  </div>
</template>
