import { For, Match, Show, Switch, createMemo } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { Chat } from "../../../lib/solid/chat"
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
import type { UIDataTypes, UIMessage } from "ai"

export default function ToolSheet() {
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

  const conversation = new Chat<ChatMessage>({
    messages: initialMessages,
    transport,
  })
  const nextMessage = createMemo(() => chat.next(conversation.messages))
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy() && message === conversation.messages.at(-1)
  type ReadFilePart = Extract<
    ChatMessage["parts"][number],
    { type: "tool-readFile" }
  >
  const running = (message: ChatMessage, part: ReadFilePart) =>
    streaming(message) &&
    (part.state === "input-streaming" || part.state === "input-available")

  function advance() {
    const next = nextMessage()
    if (next) void conversation.sendMessage(next)
    else conversation.messages = initialMessages
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For each={conversation.messages}>
          {(message) => (
            <>
              {message.role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message)}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <For each={message.parts}>
                      {(part) => (
                        <Switch>
                          <Match when={part.type === "text" && part}>
                            {(text) => <p>{text().text}</p>}
                          </Match>
                          <Match
                            when={
                              part.type === "tool-readFile" &&
                              part.state === "output-available" &&
                              part
                            }
                          >
                            {(file) => (
                              <Trace>
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
                                      <TraceTitle>
                                        Read {file().output.path}
                                      </TraceTitle>
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
                                        {file().output.path}
                                      </SheetTitle>
                                      <SheetDescription>
                                        {
                                          file().output.content.split("\n")
                                            .length
                                        }{" "}
                                        lines
                                      </SheetDescription>
                                    </SheetHeader>
                                    <CodeBlock sx={styles.codeBlock}>
                                      <CodeBlockContent lineNumbers>
                                        {file().output.content}
                                      </CodeBlockContent>
                                    </CodeBlock>
                                  </SheetContent>
                                </Sheet>
                              </Trace>
                            )}
                          </Match>
                          <Match when={part.type === "tool-readFile" && part}>
                            {(file) => (
                              <Trace>
                                <TraceLine
                                  status={
                                    running(message, file())
                                      ? "running"
                                      : "error"
                                  }
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
                                    {running(message, file())
                                      ? "Reading"
                                      : "Failed to read"}{" "}
                                    {file().input?.path}
                                  </TraceTitle>
                                </TraceLine>
                              </Trace>
                            )}
                          </Match>
                        </Switch>
                      )}
                    </For>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </For>
        <Show when={!busy()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={advance}
          >
            {nextMessage() ? "Send message" : "Reset"}
          </Button>
        </Show>
      </div>
    </div>
  )
}
