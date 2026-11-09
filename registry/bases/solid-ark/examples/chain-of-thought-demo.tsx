import { ChainOfThought } from "../components/chain-of-thought-demo/chain-of-thought"
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
import type { ChatMessage } from "../components/chain-of-thought-demo/types"

export default function ChainOfThoughtDemo() {
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

  const chat = createChat<ChatMessage>()
    .user("Why is the checkout deploy so slow?")
    .assistant(({ writer }) => {
      writer
        .tool("readBuildLog", { input: { deployment: "dpl_8Kx2" } })
        .sleep(900)
        .output({
          log: "install    41s\ncompile    38s\nimages   3m 52s",
        })
      writer
        .tool("searchWeb", { input: { query: "next.js image cache key" } })
        .sleep(900)
        .output({
          results: [
            {
              title: "Image component | nextjs.org",
              url: "https://nextjs.org/docs/app/api-reference/components/image",
            },
            {
              title: "Build cache | vercel.com",
              url: "https://vercel.com/docs/deployments/troubleshoot-a-build",
            },
          ],
        })
      writer
        .tool("searchCode", { input: { query: "cacheKey" } })
        .sleep(900)
        .output({ files: ["next.config.ts", "scripts/optimize-images.ts"] })
      writer.text(
        "Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy() && message === conversation.messages.at(-1)
  const stepsOf = (message: ChatMessage) =>
    message.parts.filter(
      (part) =>
        part.type === "tool-searchWeb" ||
        part.type === "tool-readBuildLog" ||
        part.type === "tool-searchCode"
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
                    <Show when={stepsOf(message).length > 0}>
                      <ChainOfThought
                        steps={stepsOf(message)}
                        streaming={streaming(message)}
                        answering={getMessageText(message).length > 0}
                      />
                    </Show>
                    <Show when={getMessageText(message)}>
                      <p>{getMessageText(message)}</p>
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
