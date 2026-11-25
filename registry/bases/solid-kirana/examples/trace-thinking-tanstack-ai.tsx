import { ThinkingTrace } from "../components/trace-thinking-tanstack-ai/thinking-trace"
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
import type { UIMessage } from "@tanstack/ai-client"

export default function TraceThinkingTanstackAi() {
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
    .user("Why is the checkout deploy so slow?")
    .assistant(({ writer }) => {
      writer.reasoning(
        "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
        { delayMs: 60 }
      )
      writer.sleep(400)
      writer.text(
        "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash."
      )
    })

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  function groupParts(parts: UIMessage["parts"]) {
    const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

    for (const part of parts) {
      const trace = part.type === "thinking"

      if (!trace && part.type !== "text") {
        continue
      }

      const last = runs.at(-1)

      if (last?.trace === trace) {
        last.parts.push(part)
      } else {
        runs.push({ trace, parts: [part] })
      }
    }

    return runs
  }

  const { messages, append, setMessages, status } = useChat({
    threadId: "trace-thinking",
    initialMessages,
    connection,
  })
  const nextMessage = createMemo(() => chat.next(messages()))
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  const live = (index: number) =>
    status() === "streaming" && index === messages().length - 1

  type Part = UIMessage["parts"][number]
  const thinkingPart = (part: Part) =>
    part.type === "thinking" ? part : undefined
  const textPart = (part: Part) => (part.type === "text" ? part : undefined)

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
                    <For keyed={false} each={groupParts(message().parts)}>
                      {(run) => (
                        <>
                          {run().trace ? (
                            <Trace>
                              <For keyed={false} each={run().parts}>
                                {(part) => (
                                  <Show when={thinkingPart(part())}>
                                    {(thinking) => (
                                      <ThinkingTrace
                                        text={thinking().content}
                                        running={
                                          live(index) &&
                                          message().parts.at(-1) === thinking()
                                        }
                                      />
                                    )}
                                  </Show>
                                )}
                              </For>
                            </Trace>
                          ) : (
                            <For keyed={false} each={run().parts}>
                              {(part) => (
                                <Show when={textPart(part())}>
                                  {(text) => <p>{text().content}</p>}
                                </Show>
                              )}
                            </For>
                          )}
                        </>
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
