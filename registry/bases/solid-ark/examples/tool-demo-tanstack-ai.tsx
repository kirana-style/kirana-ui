import { ToolRow } from "../components/tool-demo-tanstack-ai/tool-row"
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
  ToolResultPart,
  tools,
} from "../components/tool-demo-tanstack-ai/types"

export default function ToolDemoTanstackAi() {
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
    .user("Which package managers are installed?")
    .assistant(({ writer }) => {
      writer
        .tool("runCommand", { input: { command: "node --version" } })
        .sleep(900)
        .output({ stdout: "v24.18.0" })
      writer
        .tool("runCommand", { input: { command: "npm --version" } })
        .sleep(900)
        .output({ stdout: "11.6.2" })
      writer
        .tool("runCommand", { input: { command: "pnpm --version" } })
        .sleep(900)
        .error("command not found: pnpm")
      writer.text("Node 24 and npm 11 are installed. pnpm is not.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "tool-demo",
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
        part.type === "tool-call" && part.name === "runCommand"
    )
  // A tool call's error is in the `tool-result` part that follows it.
  const resultOf = (message: ChatMessage, part: ToolPart) =>
    message.parts.find(
      (result): result is ToolResultPart =>
        result.type === "tool-result" && result.toolCallId === part.id
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
                            <ToolRow
                              part={part()}
                              result={resultOf(message(), part())}
                              streaming={streaming(index)}
                              defaultOpen={
                                busy() ? undefined : part().state === "error"
                              }
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
