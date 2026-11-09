import { CommandRow } from "../components/stack-trace-demo/command-row"
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
import type { ChatMessage } from "../components/stack-trace-demo/types"

export default function StackTraceDemo() {
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

  const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`

  const chat = createChat<ChatMessage>()
    .user("Reset the database and seed it.")
    .assistant(({ writer }) => {
      writer
        .tool("runCommand", {
          input: { command: "pnpm prisma migrate reset --skip-seed" },
        })
        .sleep(900)
        .output({
          stdout: `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`,
        })
      writer
        .tool("runCommand", { input: { command: "pnpm prisma db seed" } })
        .sleep(1200)
        .error(STACK)
      writer.text(
        "The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined."
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
                              streaming={streaming(message)}
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
