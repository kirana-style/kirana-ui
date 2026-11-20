<script setup lang="ts">
import { toolDefinition } from "@tanstack/ai"
import { clientTools, useChat } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { computed } from "vue"
import { z } from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
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
import PlanRow from "../components/plan-demo-tanstack-ai/PlanRow.vue"
import type { Plan } from "../components/plan-demo-tanstack-ai/PlanRow.vue"

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

// TanStack AI's messages have no data parts: the agent writes its plan with a tool, each call
// the whole plan as it stands.
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the plan and the status of each step.",
  inputSchema: z.object({
    title: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        status: z.enum(["done", "running", "pending"]),
      })
    ),
  }),
  outputSchema: z.string(),
})

const tools = clientTools(updatePlan)

type ChatMessage = UIMessage<typeof tools>

const STEPS = [
  "Install @base-ui/react",
  "Replace the Radix imports",
  "Rename asChild to render",
  "Run the type checker",
]

function planAt(current: number) {
  return {
    title: "Plan: migrate to Base UI",
    steps: STEPS.map((title, index) => ({
      title,
      status:
        index < current ? "done" : index === current ? "running" : "pending",
    })),
  } satisfies Plan
}

const chat = createChat<typeof tools>()
  .user("Migrate the dialog components to Base UI.")
  .assistant(({ writer }) => {
    STEPS.forEach((_, index) => {
      writer.tool("updatePlan", {
        input: planAt(index),
        output: "Updated the plan.",
      })
      writer.sleep(1200)
    })
    writer.tool("updatePlan", {
      input: planAt(STEPS.length),
      output: "Updated the plan.",
    })
    writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const { messages, append, setMessages, status } = useChat({
  threadId: "plan-demo",
  initialMessages: transcript,
  connection,
  tools,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const streaming = (message: ChatMessage) =>
  busy.value && message === messages.value.at(-1)
// The plan as its latest call wrote it.
const planOf = (message: ChatMessage) =>
  message.parts
    .filter((part) => part.type === "tool-call")
    .filter((part) => part.name === "updatePlan")
    .at(-1)?.input

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
            <Trace v-if="planOf(message)">
              <PlanRow
                :plan="planOf(message)!"
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
