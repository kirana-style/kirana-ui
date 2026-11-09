import { CommandRow } from "../components/terminal-demo/command-row"
import { For, Show, createMemo } from "solid-js"
import { Chat } from "../../../lib/solid/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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
import type { ChatMessage } from "../components/terminal-demo/types"

export default function TerminalDemo() {
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

  const chat = createChat<ChatMessage>()
    .user("Run the checks, then build the app.")
    .assistant(({ writer }) => {
      for (const { id, command, output } of COMMANDS) {
        const tool = writer.tool("runCommand", {
          toolCallId: id,
          input: { command },
        })

        // The tool streams its output as a data part with the tool call's id.
        output.forEach((_, index) => {
          writer
            .data({
              type: "data-terminal",
              id,
              data: { output: output.slice(0, index + 1).join("\n") },
            })
            .sleep(200)
        })

        tool.output({ exitCode: 0 })
      }

      writer.text("Lint and tests pass, and the build compiled both routes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  function getOutput(message: ChatMessage, toolCallId: string) {
    for (const part of message.parts) {
      if (part.type === "data-terminal" && part.id === toolCallId) {
        return part.data.output
      }
    }

    return ""
  }

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
  const toolsOf = (message: ChatMessage) =>
    message.parts.filter((part) => part.type === "tool-runCommand")

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
                    <Show when={toolsOf(message).length > 0}>
                      <Trace>
                        <For each={toolsOf(message)}>
                          {(part) => (
                            <CommandRow
                              part={part}
                              output={getOutput(message, part.toolCallId)}
                              streaming={streaming(message)}
                              defaultOpen={
                                busy()
                                  ? undefined
                                  : part === toolsOf(message).at(-1)
                              }
                            />
                          )}
                        </For>
                      </Trace>
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
