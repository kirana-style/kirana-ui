import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { UIMessage } from "ai"
import { createChat, getMessageText } from "../../../lib/ai"
import { ToolTrace } from "../components/trace-tool-calls"
import { Chat } from "../../../lib/angular/chat"
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
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"

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
      .tool("runCommand", {
        dynamic: true,
        input: { command: "node --version" },
      })
      .sleep(900)
      .output({ stdout: "v24.18.0" })
    writer
      .tool("runCommand", {
        dynamic: true,
        input: { command: "npm --version" },
      })
      .sleep(900)
      .output({ stdout: "11.6.2" })
    writer
      .tool("runCommand", {
        dynamic: true,
        input: { command: "pnpm --version" },
      })
      .sleep(900)
      .error("command not found: pnpm")
    writer.text("Node 24 and npm 11 are installed. pnpm is not.")
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

function groupParts(parts: UIMessage["parts"]) {
  const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

  for (const part of parts) {
    const trace = part.type === "dynamic-tool"

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

@Component({
  selector: "trace-tool-calls",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    ToolTrace,
    Trace,
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
              <div kuiMessageContent [sx]="styles.messageContent">
                @for (
                  run of groupParts(message.parts);
                  track runIndex;
                  let runIndex = $index
                ) {
                  @if (run.trace) {
                    <div kuiTrace>
                      @for (
                        part of run.parts;
                        track part.type === "dynamic-tool"
                          ? part.toolCallId
                          : index;
                        let index = $index
                      ) {
                        @if (part.type === "dynamic-tool") {
                          <kui-tool-trace
                            [part]="part"
                            [live]="live(message)"
                          />
                        }
                      }
                    </div>
                  } @else {
                    @for (part of run.parts; track $index) {
                      @if (part.type === "text") {
                        <p>{{ part.text }}</p>
                      }
                    }
                  }
                }
              </div>
            </div>
          }
        }
        @if (!busy()) {
          <button
            kuiButton
            variant="outline"
            size="sm"
            [sx]="styles.button"
            (click)="advance()"
          >
            {{ nextMessage() ? "Send message" : "Reset" }}
          </button>
        }
      </div>
    </div>
  `,
})
export default class TraceToolCalls {
  protected readonly chat = new Chat({ messages: initialMessages, transport })
  protected readonly nextMessage = computed(() => chat.next(this.chat.messages))
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected readonly styles = styles
  protected readonly groupParts = groupParts
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected live(message: UIMessage) {
    return (
      this.chat.status === "streaming" && message === this.chat.messages.at(-1)
    )
  }

  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.sendMessage(next)
    else this.chat.messages = initialMessages
  }
}
