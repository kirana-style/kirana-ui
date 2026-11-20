<script setup lang="ts">
import { useChat } from "@tanstack/ai-vue"
import { computed } from "vue"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { tools } from "../components/sources-demo-tanstack-ai/tools"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import Sources from "../components/sources-demo-tanstack-ai/Sources.vue"

const styles = {
  div: css({
    display: "flex",
    minHeight: space[72],
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const chat = createChat<typeof tools>()
  .user("How do I start an Astro project with pnpm?")
  .assistant(({ writer }) => {
    // TanStack AI's messages have no source parts: the sources are what a search returned.
    writer.tool("searchWeb", {
      input: { query: "create astro project pnpm" },
      output: {
        sources: [
          {
            url: "https://docs.astro.build/en/install-and-setup/",
            title: "Install Astro | docs.astro.build",
          },
          {
            url: "https://www.npmjs.com/package/create-astro",
            title: "create-astro | npmjs.com",
          },
          {
            url: "https://docs.astro.build/en/install-and-setup/",
            title: "Install Astro | docs.astro.build",
          },
          {
            url: "https://pnpm.io/cli/create",
            title: "pnpm create | pnpm.io",
          },
        ],
      },
    })
    writer.text(
      "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const { messages, append, setMessages, status } = useChat({
  threadId: "sources-demo",
  initialMessages: transcript,
  connection,
  tools,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const sourcesOf = (message: (typeof messages.value)[number]) =>
  message.parts
    .filter((part) => part.type === "tool-call")
    .flatMap((part) =>
      part.name === "searchWeb" ? (part.output?.sources ?? []) : []
    )
    .filter(
      (part, index, all) =>
        all.findIndex((other) => other.url === part.url) === index
    )

function replay() {
  setMessages([])
  void append(question)
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
          <MessageContent :sx="styles.messageContent">
            <p v-if="getMessageText(message)">{{ getMessageText(message) }}</p>
            <Sources
              v-if="sourcesOf(message).length > 0"
              :sources="sourcesOf(message)"
            />
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
