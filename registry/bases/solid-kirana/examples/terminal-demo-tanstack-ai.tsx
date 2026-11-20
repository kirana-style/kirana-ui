import { CommandRow } from "../components/terminal-demo-tanstack-ai/command-row"
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
} from "../components/terminal-demo-tanstack-ai/types"

export default function TerminalDemoTanstackAi() {
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

  const COMMANDS = [
    {
      id: "lint",
      command: "pnpm lint",
      output: ["> acme-chat@0.1.0 lint", "> eslint ."],
    },
    {
      id: "test",
      command: "pnpm test",
      output: [
        "> acme-chat@0.1.0 test",
        "> vitest run",
        "",
        " ✓ lib/ai.test.ts (6 tests) 41ms",
        " ✓ components/chat.test.tsx (9 tests) 212ms",
        "",
        " Test Files  2 passed (2)",
        "      Tests  15 passed (15)",
      ],
    },
    {
      id: "build",
      command: "pnpm build",
      output: [
        "> acme-chat@0.1.0 build",
        "> next build",
        "",
        "   ▲ Next.js 16.3.0",
        "   Creating an optimized production build ...",
        " ✓ Compiled successfully in 4.2s",
        " ✓ Generating static pages (12/12)",
        "",
        "Route (app)                Size  First Load JS",
        "┌ ○ /                     1.9 kB       112 kB",
        "└ ƒ /api/chat              141 B       102 kB",
      ],
    },
  ]

  const chat = createChat<typeof tools>()
    .user("Run the checks, then build the app.")
    .assistant(({ writer }) => {
      for (const { id, command, output } of COMMANDS) {
        // The output arrives with the result, once the command has run.
        writer
          .tool("runCommand", { toolCallId: id, input: { command } })
          .sleep(200 * output.length)
          .output({ output: output.join("\n"), exitCode: 0 })
      }

      writer.text("Lint and tests pass, and the build compiled both routes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "terminal-demo",
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
                          {(part, at) => (
                            <CommandRow
                              part={part()}
                              result={resultOf(message(), part())}
                              streaming={streaming(index)}
                              defaultOpen={
                                busy()
                                  ? undefined
                                  : at === toolsOf(message()).length - 1
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
