<script setup lang="ts">
import type { ChatMessage, Todo } from "../components/queue-demo/types"
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"
import { createChat, getMessageText } from "../../../lib/ai"
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
import TodoQueue from "../components/queue-demo/TodoQueue.vue"

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

const TODOS = [
  "Add a dark variant to the theme tokens",
  "Read the theme from a cookie",
  "Add a toggle to the settings page",
  "Check contrast on the charts",
]

function todosAt(current: number) {
  return TODOS.map(
    (content, index) =>
      ({
        content,
        status:
          index < current
            ? "completed"
            : index === current
              ? "in_progress"
              : "pending",
      }) satisfies Todo
  )
}

const chat = createChat<ChatMessage>()
  .user("Add dark mode to the settings page.")
  .assistant(({ writer }) => {
    TODOS.forEach((_, index) => {
      writer
        .tool("writeTodos", { input: { todos: todosAt(index) } })
        .output("Updated the todo list.")
      writer.sleep(1400)
    })
    writer
      .tool("writeTodos", { input: { todos: todosAt(TODOS.length) } })
      .output("Updated the todo list.")
    writer.text("Dark mode is in. The toggle is under Settings, Appearance.")
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

const { messages, sendMessage, status } = useChat<ChatMessage>({
  messages: transcript,
  transport,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const streaming = (message: (typeof messages.value)[number]) =>
  busy.value && message === messages.value.at(-1)
const todosOf = (message: ChatMessage) =>
  message.parts
    .filter((part) => part.type === "tool-writeTodos")
    .filter((part) => part.state !== "input-streaming")
    .at(-1)?.input?.todos

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
            <TodoQueue
              v-if="todosOf(message)"
              :todos="todosOf(message)!"
              :streaming="streaming(message)"
            />
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
