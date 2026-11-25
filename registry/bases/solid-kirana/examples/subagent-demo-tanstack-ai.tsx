import { SubagentRow } from "../components/subagent-demo-tanstack-ai/subagent-row"
import { For, Show, createMemo } from "solid-js"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
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
  AgentPart,
  tools,
} from "../components/subagent-demo-tanstack-ai/types"

export default function SubagentDemoTanstackAi() {
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

  const steps = [
    {
      command: "grep -rn cacheKey scripts",
      stdout:
        "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
    },
    {
      command: "sed -n 13,15p scripts/optimize-images.ts",
      stdout:
        'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
    },
    {
      command: "ls public/images | wc -l",
      stdout: "1240",
    },
  ]

  const chat = createChat<typeof tools>()
    .user("Why does image optimization rerun on every deploy?")
    .assistant(({ writer }) => {
      writer
        .tool("researchAgent", {
          input: {
            task: "Find out why image optimization reruns on every deploy.",
          },
        })
        .sleep(600 + steps.length * 1000)
        .output({
          steps,
          report:
            "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again.",
        })
      writer.sleep(400)
      writer.text(
        "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "subagent-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  const agentsOf = (message: ChatMessage) =>
    message.parts.filter(
      (part): part is AgentPart =>
        part.type === "tool-call" && part.name === "researchAgent"
    )

  function replay() {
    setMessages([])
    if (question) void append(question)
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
                    <Show when={agentsOf(message()).length > 0}>
                      <Trace>
                        <For keyed={false} each={agentsOf(message())}>
                          {(part) => (
                            <SubagentRow
                              part={part()}
                              streaming={streaming(index)}
                            />
                          )}
                        </For>
                      </Trace>
                    </Show>
                    <Show when={getMessageText(message())}>
                      <p>{getMessageText(message())}</p>
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
