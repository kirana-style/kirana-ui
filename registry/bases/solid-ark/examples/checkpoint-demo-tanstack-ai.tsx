import { Index, Show, createMemo } from "solid-js"
import { toolDefinition } from "@tanstack/ai"
import { useChat } from "@tanstack/ai-solid"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Marker, MarkerContent } from "../ui/marker"
import { Message, MessageContent } from "../ui/message"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

export default function CheckpointDemoTanstackAi() {
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
    markerContent: css({
      display: { "*": null, base: "inline-flex" },
      alignItems: { "*": null, base: "center" },
      gap: { "*": null, base: space[2] },
    }),
    button: css({
      marginTop: { "*": null, base: "auto" },
      alignSelf: { "*": null, base: "flex-start" },
    }),
  }

  // TanStack AI's messages have no data parts: the agent saves a checkpoint with a tool, whose
  // input is its label.
  const saveCheckpoint = toolDefinition({
    name: "saveCheckpoint",
    description: "Save a checkpoint the conversation can be restored to.",
    inputSchema: z.object({ label: z.string() }),
  })
  const tools = [saveCheckpoint] as const

  type ChatMessage = UIMessage<typeof tools>

  type CheckpointPart = Extract<
    ChatMessage["parts"][number],
    { type: "tool-call" }
  >

  const chat = createChat<typeof tools>()
    .user("Rename the button component to action.")
    .assistant(({ writer }) => {
      writer.text("Renamed Button to Action in components/ui/button.tsx.")
      writer
        .tool("saveCheckpoint", { input: { label: "Button renamed" } })
        .output({})
    })
    .user("Update the docs to match.")
    .assistant(({ writer }) => {
      writer.text("Updated the Button page to say Action.")
    })

  const transcript = chat.get()
  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "checkpoint-demo",
    initialMessages: transcript,
    connection,
  })
  const nextMessage = createMemo(() => chat.next(messages()))
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  const checkpointOf = (message: ChatMessage) =>
    message.parts.find(
      (part): part is CheckpointPart =>
        part.type === "tool-call" && part.name === "saveCheckpoint"
    )
  const canRestore = (message: ChatMessage) =>
    messages().findIndex((item) => item.id === message.id) <
    messages().length - 1

  function restore(messageId: string) {
    const index = messages().findIndex((message) => message.id === messageId)

    if (index === -1) {
      return
    }

    setMessages(messages().slice(0, index + 1))
  }

  function advance() {
    const next = nextMessage()
    if (next) void append(next)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Index each={messages()}>
          {(message) => (
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
                  <MessageContent>
                    <p>{getMessageText(message())}</p>
                  </MessageContent>
                </Message>
              )}
              <Show when={checkpointOf(message())}>
                <Marker variant="separator">
                  <MarkerContent sx={styles.markerContent}>
                    {checkpointOf(message())!.input?.label}{" "}
                    <Show when={canRestore(message())}>
                      <Button
                        size="xs"
                        variant="outline"
                        aria-label={`Restore to ${checkpointOf(message())!.input?.label}`}
                        onClick={() => {
                          restore(message().id)
                        }}
                      >
                        Restore
                      </Button>
                    </Show>
                  </MarkerContent>
                </Marker>
              </Show>
            </>
          )}
        </Index>
        <Show when={!busy() && nextMessage()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={advance}
          >
            Continue
          </Button>
        </Show>
      </div>
    </div>
  )
}
