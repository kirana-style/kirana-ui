<script setup lang="ts">
import ReasoningRow from "../components/confirmation-demo/ReasoningRow.vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"
import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai"
import type { UIDataTypes, UIMessage } from "ai"
import { createChat, getMessageText } from "../../../lib/ai"
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

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

const chat = createChat<ChatMessage>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    writer.tool("runCommand", {
      input: { command: "rm -rf dist" },
      needsApproval: true,
      output: { stdout: "" },
    })
  })
  .assistant(({ writer, toolCall }) => {
    writer.sleep(600)
    writer.text(
      toolCall?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

const { messages, sendMessage, status, addToolApprovalResponse } =
  useChat<ChatMessage>({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  })
const nextMessage = computed(() => chat.next(messages.value))
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
type Part = ChatMessage["parts"][number]
const denied = (part: Extract<Part, { type: "tool-runCommand" }>) =>
  part.state === "output-denied" ||
  (part.state === "approval-responded" && !part.approval.approved)

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
            <template v-for="(part, index) in message.parts" :key="index">
              <p v-if="part.type === 'text'">{{ part.text }}</p>
              <Trace v-else-if="part.type === 'reasoning'">
                <ReasoningRow
                  :text="part.text"
                  :running="part.state === 'streaming'"
                />
              </Trace>
              <template v-else-if="part.type === 'tool-runCommand'">
                <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
                <Item
                  v-if="part.state === 'approval-requested'"
                  variant="outline"
                  size="sm"
                >
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
                    <ItemTitle>Run {{ part.input.command }}?</ItemTitle>
                    <ItemDescription>
                      The command runs in this project.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      size="sm"
                      variant="outline"
                      @click="
                        addToolApprovalResponse({
                          id: part.approval.id,
                          approved: false,
                        })
                      "
                    >
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      @click="
                        addToolApprovalResponse({
                          id: part.approval.id,
                          approved: true,
                        })
                      "
                    >
                      Approve
                    </Button>
                  </ItemActions>
                </Item>
                <Trace v-else>
                  <TraceLine
                    :status="
                      !denied(part) && part.state !== 'output-available'
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
                          : part.state === "output-available"
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
