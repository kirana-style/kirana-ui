<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"
import type { UIDataTypes, UIMessage } from "ai"
import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { Message, MessageContent } from "../ui/message"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontFamily,
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
  sheetTitle: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
  codeBlock: css({
    marginInline: { "*": null, base: space[6] },
    marginBottom: { "*": null, base: space[6] },
    width: { "*": null, base: "auto" },
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
    readFile: {
      input: { path: string }
      output: { path: string; content: string }
    }
  }
>

const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`

const chat = createChat<ChatMessage>()
  .user("Which AI SDK version does this app use?")
  .assistant(({ writer }) => {
    writer
      .tool("readFile", { input: { path: "package.json" } })
      .sleep(900)
      .output({ path: "package.json", content: PACKAGE_JSON })
    writer.text("It uses ai 7 with @ai-sdk/react 4.")
  })

const initialMessages = chat.get(0)

const transport = chat.transport({ delayMs: 20 })

const { messages, sendMessage, status } = useChat<ChatMessage>({
  messages: initialMessages,
  transport,
})
const nextMessage = computed(() => chat.next(messages.value))
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
const streaming = (message: ChatMessage) =>
  busy.value && message === messages.value.at(-1)
type ReadFilePart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-readFile" }
>
const running = (message: ChatMessage, part: ReadFilePart) =>
  streaming(message) &&
  (part.state === "input-streaming" || part.state === "input-available")

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
              <template v-else-if="part.type === 'tool-readFile'">
                <Trace v-if="part.state !== 'output-available'">
                  <TraceLine
                    :status="running(message, part) ? 'running' : 'error'"
                  >
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="FileTextIcon"
                        tabler="IconFileText"
                        hugeicons="FileIcon"
                        phosphor="FileTextIcon"
                        remixicon="RiFileTextLine"
                      />
                    </TraceIcon>
                    <TraceTitle>
                      {{
                        running(message, part) ? "Reading" : "Failed to read"
                      }}
                      {{ part.input?.path }}
                    </TraceTitle>
                  </TraceLine>
                </Trace>
                <Trace v-else>
                  <Sheet>
                    <SheetTrigger>
                      <TraceLine>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="FileTextIcon"
                            tabler="IconFileText"
                            hugeicons="FileIcon"
                            phosphor="FileTextIcon"
                            remixicon="RiFileTextLine"
                          />
                        </TraceIcon>
                        <TraceTitle>Read {{ part.output.path }}</TraceTitle>
                        <TraceIcon>
                          <IconPlaceholder
                            lucide="ChevronRightIcon"
                            tabler="IconChevronRight"
                            hugeicons="ArrowRight01Icon"
                            phosphor="CaretRightIcon"
                            remixicon="RiArrowRightSLine"
                          />
                        </TraceIcon>
                      </TraceLine>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle :sx="styles.sheetTitle">{{
                          part.output.path
                        }}</SheetTitle>
                        <SheetDescription>
                          {{ part.output.content.split("\n").length }} lines
                        </SheetDescription>
                      </SheetHeader>
                      <CodeBlock :sx="styles.codeBlock">
                        <CodeBlockContent line-numbers>{{
                          part.output.content
                        }}</CodeBlockContent>
                      </CodeBlock>
                    </SheetContent>
                  </Sheet>
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
