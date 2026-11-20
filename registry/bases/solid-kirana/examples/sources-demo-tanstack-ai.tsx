import { Sources } from "../components/sources-demo-tanstack-ai/sources"
import { Index, Show, createMemo } from "solid-js"
import { useChat } from "@tanstack/ai-solid"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
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
import type {
  ChatMessage,
  tools,
} from "../components/sources-demo-tanstack-ai/types"

export default function SourcesDemoTanstackAi() {
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

  // The sources come from the search tool's output, which the agent calls before it answers.
  const chat = createChat<typeof tools>()
    .user("How do I start an Astro project with pnpm?")
    .assistant(({ writer }) => {
      writer
        .tool("searchWeb", { input: { query: "astro create project pnpm" } })
        .output({
          results: [
            {
              url: "https://docs.astro.build/en/install-and-setup/",
              title: "Install Astro | docs.astro.build",
            },
            {
              url: "https://www.npmjs.com/package/create-astro",
              title: "create-astro | npmjs.com",
            },
            {
              url: "https://docs.astro.build/en/install-and-setup/",
              title: "Install Astro | docs.astro.build",
            },
            {
              url: "https://pnpm.io/cli/create",
              title: "pnpm create | pnpm.io",
            },
          ],
        })
      writer.text(
        "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "sources-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  const sourcesOf = (message: ChatMessage) =>
    message.parts
      .flatMap((part) =>
        part.type === "tool-call" && part.name === "searchWeb"
          ? (part.output?.results ?? [])
          : []
      )
      .filter(
        (part, index, all) =>
          all.findIndex((other) => other.url === part.url) === index
      )

  function replay() {
    setMessages([])
    if (question) void append(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Index each={messages()}>
          {(message) => (
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
                    <Show when={getMessageText(message())}>
                      <p>{getMessageText(message())}</p>
                    </Show>
                    <Show when={sourcesOf(message()).length > 0}>
                      <Sources sources={sourcesOf(message())} />
                    </Show>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </Index>
        <Show when={!busy()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={replay}
          >
            Replay
          </Button>
        </Show>
      </div>
    </div>
  )
}
