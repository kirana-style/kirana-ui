import { TestResultsRow } from "../components/test-results-demo-tanstack-ai/test-results-row"
import { Index, Show, createMemo } from "solid-js"
import { useChat } from "@tanstack/ai-solid"
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
  ToolPart,
  tools,
} from "../components/test-results-demo-tanstack-ai/types"

export default function TestResultsDemoTanstackAi() {
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

  const chat = createChat<typeof tools>()
    .user("Run the checkout tests.")
    .assistant(({ writer }) => {
      writer
        .tool("runTests", { input: { command: "pnpm test checkout" } })
        .sleep(1500)
        .output({
          suites: [
            {
              name: "cart.test.ts",
              tests: [
                { name: "adds an item", status: "passed" },
                { name: "removes an item", status: "passed" },
                { name: "applies a discount code", status: "passed" },
              ],
            },
            {
              name: "payment.test.ts",
              tests: [
                { name: "charges the saved card", status: "passed" },
                {
                  name: "retries a declined card",
                  status: "failed",
                  error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
                },
              ],
            },
          ],
        })
      writer.text(
        "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "test-results-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  const toolsOf = (message: ChatMessage) =>
    message.parts.filter(
      (part): part is ToolPart =>
        part.type === "tool-call" && part.name === "runTests"
    )

  function replay() {
    setMessages([])
    if (question) void append(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Index each={messages()}>
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
                    <Show when={toolsOf(message()).length > 0}>
                      <Trace>
                        <Index each={toolsOf(message())}>
                          {(part) => (
                            <TestResultsRow
                              part={part()}
                              streaming={streaming(index)}
                            />
                          )}
                        </Index>
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
