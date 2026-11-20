import * as React from "react"
import { clientTools, useChat } from "@tanstack/ai-react"
import type { UIMessage } from "@tanstack/ai-react"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

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

// TanStack AI's connection carries no data parts, so the agent marks a checkpoint with a tool.
const saveCheckpoint = toolDefinition({
  name: "saveCheckpoint",
  description: "Mark a point the conversation can be restored to.",
  inputSchema: z.object({ label: z.string() }),
  outputSchema: z.string(),
})

const tools = clientTools(saveCheckpoint)

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
      .output("Saved the checkpoint.")
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.")
  })

const transcript = chat.get()
const connection = chat.transport({ delayMs: 20 })

export default function CheckpointDemoTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages: transcript,
    connection,
    threadId: "checkpoint-demo",
    tools,
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
            (part): part is CheckpointPart =>
              part.type === "tool-call" && part.name === "saveCheckpoint"
          )?.input
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
                    {checkpoint.label}
                    {canRestore && (
                      <Button
                        size="xs"
                        variant="outline"
                        aria-label={`Restore to ${checkpoint.label}`}
                        onPress={() => restore(message.id)}
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
            onPress={() => append(nextMessage)}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}
