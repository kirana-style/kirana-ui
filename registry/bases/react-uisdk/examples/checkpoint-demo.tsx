import * as React from "react"
import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"

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

export default function CheckpointDemo() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: transcript,
    transport,
  })
  const nextMessage = chat.next(messages)
  const busy = status === "submitted" || status === "streaming"

  function restore(messageId: string) {
    const index = messages.findIndex((message) => message.id === messageId)

    if (index === -1) {
      return
    }

    setMessages(messages.slice(0, index + 1))
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {messages.map((message) => {
          const checkpoint = message.parts.find(
            (part): part is CheckpointPart => part.type === "data-checkpoint"
          )
          const index = messages.findIndex((item) => item.id === message.id)
          const canRestore = index < messages.length - 1

          return (
            <React.Fragment key={message.id}>
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
              {checkpoint && (
                <Marker variant="separator">
                  <MarkerContent sx={styles.markerContent}>
                    {checkpoint.data.label}
                    {canRestore && (
                      <Button
                        size="xs"
                        variant="outline"
                        aria-label={`Restore to ${checkpoint.data.label}`}
                        onClick={() => restore(message.id)}
                      >
                        Restore
                      </Button>
                    )}
                  </MarkerContent>
                </Marker>
              )}
            </React.Fragment>
          )
        })}
        {!busy && nextMessage && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={() => sendMessage(nextMessage)}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}
