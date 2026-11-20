import { For, Match, Show, Switch, createMemo } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { toolDefinition } from "@tanstack/ai"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
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
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

export default function ToolSheetTanstackAi() {
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

  const readFile = toolDefinition({
    name: "readFile",
    description: "Read a file in the project.",
    inputSchema: z.object({ path: z.string() }),
    outputSchema: z.object({ path: z.string(), content: z.string() }),
  })
  const tools = [readFile] as const

  type ChatMessage = UIMessage<typeof tools>

  const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`

  const chat = createChat<typeof tools>()
    .user("Which AI SDK version does this app use?")
    .assistant(({ writer }) => {
      writer
        .tool("readFile", { input: { path: "package.json" } })
        .sleep(900)
        .output({ path: "package.json", content: PACKAGE_JSON })
      writer.text("It uses ai 7 with @ai-sdk/react 4.")
    })

  const initialMessages = chat.get(0)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "tool-sheet",
    initialMessages,
    connection,
  })
  const nextMessage = createMemo(() => chat.next(messages()))
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  type Part = ChatMessage["parts"][number]
  const textPart = (part: Part) => (part.type === "text" ? part : undefined)
  const readFilePart = (part: Part) =>
    part.type === "tool-call" && part.name === "readFile" ? part : undefined
  const fileRead = (part: Part) =>
    readFilePart(part)?.state === "complete" ? readFilePart(part) : undefined
  const running = (index: number, part: Extract<Part, { type: "tool-call" }>) =>
    streaming(index) && part.state !== "complete" && part.state !== "error"

  function advance() {
    const next = nextMessage()
    if (next) void append(next)
    else setMessages(initialMessages)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For keyed={false} each={messages()}>
          {(message, index) => (
            <>
              {message().role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message())}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <For keyed={false} each={message().parts}>
                      {(part) => (
                        <Switch>
                          <Match when={textPart(part())}>
                            {(text) => <p>{text().content}</p>}
                          </Match>
                          <Match when={fileRead(part())}>
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
                                        Read {file().output?.path}
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
                                        {file().output?.path}
                                      </SheetTitle>
                                      <SheetDescription>
                                        {
                                          file().output?.content.split("\n")
                                            .length
                                        }{" "}
                                        lines
                                      </SheetDescription>
                                    </SheetHeader>
                                    <CodeBlock sx={styles.codeBlock}>
                                      <CodeBlockContent lineNumbers>
                                        {file().output?.content}
                                      </CodeBlockContent>
                                    </CodeBlock>
                                  </SheetContent>
                                </Sheet>
                              </Trace>
                            )}
                          </Match>
                          <Match when={readFilePart(part())}>
                            {(file) => (
                              <Trace>
                                <TraceLine
                                  status={
                                    running(index, file()) ? "running" : "error"
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
                                    {running(index, file())
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
