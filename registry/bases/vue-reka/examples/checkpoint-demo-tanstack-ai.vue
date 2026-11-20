<script setup lang="ts">
import { toolDefinition } from "@tanstack/ai"
import { clientTools, useChat } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { computed } from "vue"
import { z } from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Marker, MarkerContent } from "../ui/marker"
import { Message, MessageContent } from "../ui/message"
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
  markerContent: css({
    display: { "*": null, base: "inline-flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

// TanStack AI's messages have no data parts: the agent marks a checkpoint with a tool.
const saveCheckpoint = toolDefinition({
  name: "saveCheckpoint",
  description: "Mark a point the conversation can be restored to.",
  inputSchema: z.object({ label: z.string() }),
  outputSchema: z.string(),
})

const tools = clientTools(saveCheckpoint)

type ChatMessage = UIMessage<typeof tools>

const chat = createChat<typeof tools>()
  .user("Rename the button component to action.")
  .assistant(({ writer }) => {
    writer.text("Renamed Button to Action in components/ui/button.tsx.")
    writer.tool("saveCheckpoint", {
      input: { label: "Button renamed" },
      output: "Saved the checkpoint.",
    })
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.")
  })

const transcript = chat.get()
const connection = chat.transport({ delayMs: 20 })

const { messages, append, setMessages, status } = useChat({
  threadId: "checkpoint-demo",
  initialMessages: transcript,
  connection,
  tools,
})
const nextMessage = computed(() => chat.next(messages.value))
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const checkpointOf = (message: ChatMessage) =>
  message.parts
    .filter((part) => part.type === "tool-call")
    .find((part) => part.name === "saveCheckpoint")?.input
const canRestore = (message: ChatMessage) =>
  messages.value.findIndex((item) => item.id === message.id) <
  messages.value.length - 1

function restore(messageId: string) {
  const index = messages.value.findIndex((message) => message.id === messageId)

  if (index === -1) {
    return
  }

  setMessages(messages.value.slice(0, index + 1))
}

function advance() {
  if (nextMessage.value) void append(nextMessage.value)
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
            <p>{{ getMessageText(message) }}</p>
          </MessageContent>
        </Message>
        <Marker v-if="checkpointOf(message)" variant="separator">
          <MarkerContent :sx="styles.markerContent">
            {{ checkpointOf(message)!.label }}
            <Button
              v-if="canRestore(message)"
              size="xs"
              variant="outline"
              :aria-label="`Restore to ${checkpointOf(message)!.label}`"
              @click="restore(message.id)"
            >
              Restore
            </Button>
          </MarkerContent>
        </Marker>
      </template>
      <Button
        v-if="!busy && nextMessage"
        variant="outline"
        size="sm"
        :sx="styles.button"
        @click="advance"
      >
        Continue
      </Button>
    </div>
  </div>
</template>
