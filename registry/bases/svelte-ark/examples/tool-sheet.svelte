<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Chat } from "@ai-sdk/svelte"
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

  const conversation = new Chat<ChatMessage>({
    messages: initialMessages,
    transport,
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy && message === conversation.messages.at(-1)
  type ReadFilePart = Extract<
    ChatMessage["parts"][number],
    { type: "tool-readFile" }
  >
  const running = (message: ChatMessage, part: ReadFilePart) =>
    streaming(message) &&
    (part.state === "input-streaming" || part.state === "input-available")

  function advance() {
    if (nextMessage) void conversation.sendMessage(nextMessage)
    else conversation.messages = initialMessages
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each conversation.messages as message (message.id)}
      {#if message.role === 'user'}
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                {getMessageText(message)}
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      {:else}
        <Message>
          <MessageContent sx={styles.messageContent}>
            {#each message.parts as part, index (index)}
              {#if part.type === 'text'}
                <p>
                  {part.text}
                </p>
              {:else if part.type === 'tool-readFile'}
                {#if part.state !== 'output-available'}
                  <Trace>
                    <TraceLine status={running(message, part) ? 'running' : 'error'}>
                      <TraceIcon>
                        <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
                      </TraceIcon>
                      <TraceTitle>
                        {running(message, part) ? "Reading" : "Failed to read"} {part.input?.path}
                      </TraceTitle>
                    </TraceLine>
                  </Trace>
                {:else}
                  <Trace>
                    <Sheet>
                      <SheetTrigger>
                        <TraceLine>
                          <TraceIcon>
                            <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
                          </TraceIcon>
                          <TraceTitle>
                            Read {part.output.path}
                          </TraceTitle>
                          <TraceIcon>
                            <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
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
                          <CodeBlockContent lineNumbers>{part.output.content}</CodeBlockContent>
                        </CodeBlock>
                      </SheetContent>
                    </Sheet>
                  </Trace>
                {/if}
              {/if}
            {/each}
          </MessageContent>
        </Message>
      {/if}
    {/each}
    {#if !busy}
      <Button variant="outline" size="sm" sx={styles.button} onclick={advance}>
        {nextMessage ? "Send message" : "Reset"}
      </Button>
    {/if}
  </div>
</div>
