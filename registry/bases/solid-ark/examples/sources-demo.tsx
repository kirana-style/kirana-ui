import { Sources } from "../components/sources-demo/sources"
import { For, Show, createMemo } from "solid-js"
import { Chat } from "../../../lib/solid/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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
import type { UIMessage } from "ai"

export default function SourcesDemo() {
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

  const chat = createChat()
    .user("How do I start an Astro project with pnpm?")
    .assistant(({ writer }) => {
      writer.text(
        "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
      )
      writer.sourceUrl({
        url: "https://docs.astro.build/en/install-and-setup/",
        title: "Install Astro | docs.astro.build",
      })
      writer.sourceUrl({
        url: "https://www.npmjs.com/package/create-astro",
        title: "create-astro | npmjs.com",
      })
      writer.sourceUrl({
        url: "https://docs.astro.build/en/install-and-setup/",
        title: "Install Astro | docs.astro.build",
      })
      writer.sourceUrl({
        url: "https://pnpm.io/cli/create",
        title: "pnpm create | pnpm.io",
      })
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat({
    messages: transcript,
    transport,
  })
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const sourcesOf = (message: UIMessage) =>
    message.parts
      .filter((part) => part.type === "source-url")
      .filter(
        (part, index, all) =>
          all.findIndex((other) => other.url === part.url) === index
      )

  function replay() {
    conversation.messages = []
    void conversation.sendMessage(question)
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
                    <Show when={getMessageText(message)}>
                      <p>{getMessageText(message)}</p>
                    </Show>
                    <Show when={sourcesOf(message).length > 0}>
                      <Sources sources={sourcesOf(message)} />
                    </Show>
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
            onClick={replay}
          >
            Replay
          </Button>
        </Show>
      </div>
    </div>
  )
}
