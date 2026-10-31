import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useChat } from "@ai-sdk/react"
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

export default function ToolSheet() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
  const busy = status === "submitted" || status === "streaming"

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <Message key={message.id} align="end">
                <MessageContent>
                  <Bubble align="end" variant="muted">
                    <BubbleContent>{getMessageText(message)}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )
          }

          const streaming = busy && message === messages.at(-1)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <p key={index}>{part.text}</p>
                  }

                  if (part.type !== "tool-readFile") {
                    return null
                  }

                  if (part.state !== "output-available") {
                    const running =
                      streaming &&
                      (part.state === "input-streaming" ||
                        part.state === "input-available")

                    return (
                      <Trace key={part.toolCallId}>
                        <TraceLine status={running ? "running" : "error"}>
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
                            {running ? "Reading" : "Failed to read"}{" "}
                            {part.input?.path}
                          </TraceTitle>
                        </TraceLine>
                      </Trace>
                    )
                  }

                  return (
                    <Trace key={part.toolCallId}>
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
                            <TraceTitle>Read {part.output.path}</TraceTitle>
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
                            <SheetTitle sx={styles.sheetTitle}>
                              {part.output.path}
                            </SheetTitle>
                            <SheetDescription>
                              {part.output.content.split("\n").length} lines
                            </SheetDescription>
                          </SheetHeader>
                          <CodeBlock sx={styles.codeBlock}>
                            <CodeBlockContent lineNumbers>
                              {part.output.content}
                            </CodeBlockContent>
                          </CodeBlock>
                        </SheetContent>
                      </Sheet>
                    </Trace>
                  )
                })}
              </MessageContent>
            </Message>
          )
        })}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={() =>
              nextMessage
                ? sendMessage(nextMessage)
                : setMessages(initialMessages)
            }
          >
            {nextMessage ? "Send message" : "Reset"}
          </Button>
        )}
      </div>
    </div>
  )
}
