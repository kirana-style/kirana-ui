<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"
import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import ReasoningRow from "../components/reasoning-demo/ReasoningRow.vue"

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

const chat = createChat()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\n\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.",
      { delayMs: 40 }
    )
    writer.sleep(400)
    writer.text(
      "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

const { messages, sendMessage, status } = useChat({
  messages: transcript,
  transport,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const streaming = (message: (typeof messages.value)[number]) =>
  busy.value && message === messages.value.at(-1)
const reasoningOf = (message: (typeof messages.value)[number]) =>
  message.parts.filter((part) => part.type === "reasoning")

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
          <MessageContent :sx="styles.messageContent">
            <Trace v-if="reasoningOf(message).length > 0">
              <ReasoningRow
                v-for="(part, index) in reasoningOf(message)"
                :key="index"
                :text="part.text"
                :running="streaming(message) && part.state === 'streaming'"
                :default-open="busy ? undefined : true"
              />
            </Trace>
            <p v-if="getMessageText(message)">{{ getMessageText(message) }}</p>
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
