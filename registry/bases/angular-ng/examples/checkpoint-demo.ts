import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { UIMessage } from "ai"
import { Chat } from "../../../lib/angular/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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

const checkpointOf = (message: ChatMessage) =>
  message.parts.find(
    (part): part is CheckpointPart => part.type === "data-checkpoint"
  )

@Component({
  selector: "checkpoint-demo",
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
        @for (message of chat.messages; track message.id) {
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
                {{ checkpointOf(message)!.data.label }}
                @if (canRestore(message)) {
                  <button
                    kuiButton
                    size="xs"
                    variant="outline"
                    [attr.aria-label]="\`Restore to \${checkpointOf(message)!.data.label}\`"
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
export default class CheckpointDemo {
  protected readonly chat = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  protected readonly nextMessage = computed(() => chat.next(this.chat.messages))
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected canRestore(message: ChatMessage) {
    return (
      this.chat.messages.findIndex((item) => item.id === message.id) <
      this.chat.messages.length - 1
    )
  }
  protected restore(messageId: string) {
    const index = this.chat.messages.findIndex(
      (message) => message.id === messageId
    )

    if (index === -1) {
      return
    }

    this.chat.messages = this.chat.messages.slice(0, index + 1)
  }
  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.sendMessage(next)
  }
  protected readonly styles = styles
  protected readonly checkpointOf = checkpointOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
