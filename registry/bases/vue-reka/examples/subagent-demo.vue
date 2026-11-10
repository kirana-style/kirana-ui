<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"
import type {
  ChatMessage,
  SubagentMessage,
  SubagentPart,
} from "../components/subagent-demo/types"
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
import SubagentRow from "../components/subagent-demo/SubagentRow.vue"

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

const steps = [
  {
    command: "grep -rn cacheKey scripts",
    stdout:
      "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
  },
  {
    command: "sed -n 13,15p scripts/optimize-images.ts",
    stdout:
      'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
  },
  {
    command: "ls public/images | wc -l",
    stdout: "1240",
  },
]

function getSubagentMessage(done: number, report?: string): SubagentMessage {
  const parts = steps.slice(0, done).map((step, index): SubagentPart => ({
    type: "tool-runCommand",
    toolCallId: `step-${index}`,
    state: "output-available",
    input: { command: step.command },
    output: { stdout: step.stdout },
  }))

  if (done < steps.length) {
    parts.push({
      type: "tool-runCommand",
      toolCallId: `step-${done}`,
      state: "input-available",
      input: { command: steps[done].command },
    })
  }

  if (report) {
    parts.push({ type: "text", text: report })
  }

  return { id: "research-agent", role: "assistant", parts }
}

const chat = createChat<ChatMessage>()
  .user("Why does image optimization rerun on every deploy?")
  .assistant(({ writer }) => {
    const subagent = writer
      .tool("researchAgent", {
        input: {
          task: "Find out why image optimization reruns on every deploy.",
        },
      })
      .sleep(600)
    steps.forEach((_, index) => {
      subagent
        .output(getSubagentMessage(index), { preliminary: true })
        .sleep(1000)
    })
    subagent
      .output(
        getSubagentMessage(
          steps.length,
          "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again."
        )
      )
      .sleep(400)
    writer.text(
      "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
    )
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
const agentsOf = (message: ChatMessage) =>
  message.parts.filter((part) => part.type === "tool-researchAgent")

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
            <Trace v-if="agentsOf(message).length > 0">
              <SubagentRow
                v-for="part in agentsOf(message)"
                :key="part.toolCallId"
                :part="part"
                :streaming="streaming(message)"
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
