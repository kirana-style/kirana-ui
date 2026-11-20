import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { clientTools, injectChat } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Marker, MarkerContent } from "../ui/marker"
import { Message, MessageContent } from "../ui/message"

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

// The server's tool, as the client takes it for its types: the server runs it.
const saveCheckpoint = toolDefinition({
  name: "saveCheckpoint",
  description: "Mark a point the conversation can be restored to.",
  inputSchema: z.object({ label: z.string() }),
  outputSchema: z.string(),
})

const tools = clientTools(saveCheckpoint)

type ChatMessage = UIMessage<typeof tools>

// TanStack AI's connection carries no data parts: the agent saves a checkpoint with a tool call,
// whose input is its label.
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

const checkpointOf = (message: ChatMessage) =>
  message.parts
    .filter((part) => part.type === "tool-call")
    .find((part) => part.name === "saveCheckpoint" && part.input)?.input as
    | { label: string }
    | undefined

@Component({
  selector: "checkpoint-demo-tanstack-ai",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Marker,
    MarkerContent,
    Message,
    MessageContent,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (message of chat.messages(); track message.id) {
          @if (message.role === "user") {
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble align="end" variant="muted">
                  <div kuiBubbleContent>{{ getMessageText(message) }}</div>
                </div>
              </div>
            </div>
          } @else {
            <div kuiMessage>
              <div kuiMessageContent>
                <p>{{ getMessageText(message) }}</p>
              </div>
            </div>
          }
          @if (checkpointOf(message)) {
            <div kuiMarker variant="separator">
              <span kuiMarkerContent [sx]="styles.markerContent">
                {{ checkpointOf(message)!.label }}
                @if (canRestore(message)) {
                  <button
                    kuiButton
                    size="xs"
                    variant="outline"
                    [attr.aria-label]="\`Restore to \${checkpointOf(message)!.label}\`"
                    (click)="restore(message.id)"
                  >
                    Restore
                  </button>
                }
              </span>
            </div>
          }
        }
        @if (!busy() && nextMessage()) {
          <button
            kuiButton
            variant="outline"
            size="sm"
            [sx]="styles.button"
            (click)="advance()"
          >
            Continue
          </button>
        }
      </div>
    </div>
  `,
})
export default class CheckpointDemoTanstackAi {
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "checkpoint-demo",
    tools,
  })
  protected readonly nextMessage = computed(() =>
    chat.next(this.chat.messages())
  )
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected canRestore(message: ChatMessage) {
    const messages = this.chat.messages()
    return (
      messages.findIndex((item) => item.id === message.id) < messages.length - 1
    )
  }
  protected restore(messageId: string) {
    const messages = this.chat.messages()
    const index = messages.findIndex((message) => message.id === messageId)

    if (index === -1) {
      return
    }

    this.chat.setMessages(messages.slice(0, index + 1))
  }
  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.append(next)
  }
  protected readonly styles = styles
  protected readonly checkpointOf = checkpointOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
