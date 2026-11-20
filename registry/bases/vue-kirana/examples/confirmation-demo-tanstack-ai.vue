<script setup lang="ts">
import ReasoningRow from "../components/confirmation-demo-tanstack-ai/ReasoningRow.vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { toolDefinition } from "@tanstack/ai"
import { clientTools, useChat } from "@tanstack/ai-vue"
import type { UIMessage } from "@tanstack/ai-vue"
import { computed } from "vue"
import { z } from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { Message, MessageContent } from "../ui/message"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
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

// A client tool that asks first: TanStack AI holds a call to a tool with `needsApproval` until the
// reader answers, then runs it in the browser (here, it runs nothing).
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
  needsApproval: true,
}).client(() => ({ stdout: "" }))

const tools = clientTools(runCommand)

type ChatMessage = UIMessage<typeof tools>

/** Whether the reader approved the command: a denied call ends in an error (LF-042). */
const approved = (messages: ChatMessage[] = []) =>
  messages.some((message) =>
    message.parts.some(
      (part) => part.type === "tool-call" && part.state === "complete"
    )
  )

const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    // Left without a result, the call waits for the reader.
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages }) => {
    writer.sleep(600)
    writer.text(
      approved(messages)
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })

const initialMessages = chat.get(0)
const connection = chat.transport({ delayMs: 20 })

const { messages, append, setMessages, status, interrupts } = useChat({
  threadId: "confirmation-demo",
  initialMessages,
  connection,
  tools,
})
const nextMessage = computed(() => chat.next(messages.value))
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
type Part = ChatMessage["parts"][number]
type RunCommandPart = Extract<Part, { type: "tool-call" }>
type Approval = Extract<
  (typeof interrupts.value)[number],
  { kind: "tool-approval" }
>
/** The approval a call waits on, while it waits. */
const approvalOf = (part: RunCommandPart) =>
  interrupts.value.find(
    (interrupt): interrupt is Approval =>
      interrupt.kind === "tool-approval" && interrupt.toolCallId === part.id
  )
const denied = (part: RunCommandPart) => part.state === "error"

function advance() {
  if (nextMessage.value) void append(nextMessage.value)
  else setMessages(initialMessages)
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
            <template v-for="(part, index) in message.parts" :key="index">
              <p v-if="part.type === 'text'">{{ part.content }}</p>
              <Trace v-else-if="part.type === 'thinking'">
                <ReasoningRow
                  :text="part.content"
                  :running="busy && message.parts.at(-1) === part"
                />
              </Trace>
              <template v-else-if="part.type === 'tool-call'">
                <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
                <Item v-if="approvalOf(part)" variant="outline" size="sm">
                  <ItemMedia variant="icon">
                    <IconPlaceholder
                      lucide="CommandIcon"
                      tabler="IconCommand"
                      hugeicons="CommandIcon"
                      phosphor="CommandIcon"
                      remixicon="RiCommandLine"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Run {{ part.input?.command }}?</ItemTitle>
                    <ItemDescription>
                      The command runs in this project.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      size="sm"
                      variant="outline"
                      @click="approvalOf(part)?.resolveInterrupt(false)"
                    >
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      @click="approvalOf(part)?.resolveInterrupt(true)"
                    >
                      Approve
                    </Button>
                  </ItemActions>
                </Item>
                <Trace v-else>
                  <TraceLine
                    :status="
                      !denied(part) && part.state !== 'complete'
                        ? 'running'
                        : undefined
                    "
                  >
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="CommandIcon"
                        tabler="IconCommand"
                        hugeicons="CommandIcon"
                        phosphor="CommandIcon"
                        remixicon="RiCommandLine"
                      />
                    </TraceIcon>
                    <TraceTitle>
                      {{
                        denied(part)
                          ? "Denied"
                          : part.state === "complete"
                            ? "Ran"
                            : "Running"
                      }}
                      {{ part.input?.command }}
                    </TraceTitle>
                  </TraceLine>
                </Trace>
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
