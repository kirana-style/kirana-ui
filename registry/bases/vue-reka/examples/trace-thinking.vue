<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import type { UIMessage } from "ai"
import { computed } from "vue"

import { createChat, getMessageText } from "../../../lib/ai"
import ThinkingTrace from "../components/trace-thinking/ThinkingTrace.vue"
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
      "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
      { delayMs: 60 }
    )
    writer.sleep(400)
    writer.text(
      "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash."
    )
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

function groupParts(parts: UIMessage["parts"]) {
  const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

  for (const part of parts) {
    const trace = part.type === "reasoning"

    if (!trace && part.type !== "text") {
      continue
    }

    const last = runs.at(-1)

    if (last?.trace === trace) {
      last.parts.push(part)
    } else {
      runs.push({ trace, parts: [part] })
    }
  }

  return runs
}

const { messages, sendMessage, status } = useChat({
  messages: initialMessages,
  transport,
})
const nextMessage = computed(() => chat.next(messages.value))
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const live = (message: UIMessage) =>
  status.value === "streaming" && message === messages.value.at(-1)

function advance() {
  if (nextMessage.value) void sendMessage(nextMessage.value)
  else messages.value = initialMessages
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
            <template
              v-for="(run, runIndex) in groupParts(message.parts)"
              :key="runIndex"
            >
              <Trace v-if="run.trace">
                <template v-for="(part, index) in run.parts" :key="index">
                  <ThinkingTrace
                    v-if="part.type === 'reasoning'"
                    :text="part.text"
                    :running="live(message) && part.state === 'streaming'"
                  />
                </template>
              </Trace>
              <template v-else>
                <template
                  v-for="(part, index) in run.parts"
                  :key="`${runIndex}-${index}`"
                >
                  <p v-if="part.type === 'text'">{{ part.text }}</p>
                </template>
              </template>
            </template>
          </MessageContent>
        </Message>
      </template>
      <Button
        v-if="!busy"
        variant="outline"
        size="sm"
        :sx="styles.button"
        @click="advance"
      >
        {{ nextMessage ? "Send message" : "Reset" }}
      </Button>
    </div>
  </div>
</template>
