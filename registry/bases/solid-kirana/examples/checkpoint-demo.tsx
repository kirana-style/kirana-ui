import { For, Show, createMemo } from "solid-js"
import { Chat } from "../../../lib/solid/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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
import type { UIMessage } from "ai"

export default function CheckpointDemo() {
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

  type ChatMessage = UIMessage<
    unknown,
    {
      checkpoint: {
        label: string
      }
    }
  >

  type CheckpointPart = Extract<
    ChatMessage["parts"][number],
    { type: "data-checkpoint" }
  >

  const chat = createChat<ChatMessage>()
    .user("Rename the button component to action.")
    .assistant(({ writer }) => {
      writer.text("Renamed Button to Action in components/ui/button.tsx.")
      writer.data({
        type: "data-checkpoint",
        id: "rename",
        data: { label: "Button renamed" },
      })
    })
    .user("Update the docs to match.")
    .assistant(({ writer }) => {
      writer.text("Updated the Button page to say Action.")
    })

  const transcript = chat.get()
  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const nextMessage = createMemo(() => chat.next(conversation.messages))
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const checkpointOf = (message: ChatMessage) =>
    message.parts.find(
      (part): part is CheckpointPart => part.type === "data-checkpoint"
    )
  const canRestore = (message: ChatMessage) =>
    conversation.messages.findIndex((item) => item.id === message.id) <
    conversation.messages.length - 1

  function restore(messageId: string) {
    const index = conversation.messages.findIndex(
      (message) => message.id === messageId
    )

    if (index === -1) {
      return
    }

    conversation.messages = conversation.messages.slice(0, index + 1)
  }

  function advance() {
    const next = nextMessage()
    if (next) void conversation.sendMessage(next)
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
                  <MessageContent>
                    <p>{getMessageText(message)}</p>
                  </MessageContent>
                </Message>
              )}
              <Show when={checkpointOf(message)}>
                <Marker variant="separator">
                  <MarkerContent sx={styles.markerContent}>
                    {checkpointOf(message)!.data.label}{" "}
                    <Show when={canRestore(message)}>
                      <Button
                        size="xs"
                        variant="outline"
                        aria-label={`Restore to ${checkpointOf(message)!.data.label}`}
                        onClick={() => {
                          restore(message.id)
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
        </For>
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
