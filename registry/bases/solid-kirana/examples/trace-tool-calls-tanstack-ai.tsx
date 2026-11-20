import { ToolTrace } from "../components/trace-tool-calls-tanstack-ai/tool-trace"
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
  ToolCallPart,
  ToolResultPart,
  UIMessage,
} from "@tanstack/ai-client"

export default function TraceToolCallsTanstackAi() {
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

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  function groupParts(parts: UIMessage["parts"]) {
    const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

    for (const part of parts) {
      const trace = part.type === "tool-call"

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
    threadId: "trace-tool-calls",
    initialMessages,
    connection,
  })
  const nextMessage = createMemo(() => chat.next(messages()))
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  const live = (index: number) =>
    status() === "streaming" && index === messages().length - 1

  // The tools are not typed here: each call is a `tool-call` part, with its result after it.
  type Part = UIMessage["parts"][number]
  const toolPart = (part: Part) =>
    part.type === "tool-call" ? part : undefined
  const textPart = (part: Part) => (part.type === "text" ? part : undefined)
  const resultOf = (message: UIMessage, part: ToolCallPart) =>
    message.parts.find(
      (result): result is ToolResultPart =>
        result.type === "tool-result" && result.toolCallId === part.id
    )

  function advance() {
    const next = nextMessage()
    if (next) void append(next)
    else setMessages(initialMessages)
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
                    <Index each={groupParts(message().parts)}>
                      {(run) => (
                        <>
                          {run().trace ? (
                            <Trace>
                              <Index each={run().parts}>
                                {(part) => (
                                  <Show when={toolPart(part())}>
                                    {(tool) => (
                                      <ToolTrace
                                        part={tool()}
                                        result={resultOf(message(), tool())}
                                        live={live(index)}
                                      />
                                    )}
                                  </Show>
                                )}
                              </Index>
                            </Trace>
                          ) : (
                            <Index each={run().parts}>
                              {(part) => (
                                <Show when={textPart(part())}>
                                  {(text) => <p>{text().content}</p>}
                                </Show>
                              )}
                            </Index>
                          )}
                        </>
                      )}
                    </Index>
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
            onClick={advance}
          >
            {nextMessage() ? "Send message" : "Reset"}
          </Button>
        </Show>
      </div>
    </div>
  )
}
