import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { injectChat } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { ThinkingTrace } from "../components/trace-thinking-tanstack-ai"
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
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
      { delayMs: 60 }
    )
    writer.sleep(400)
    writer.text(
      "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash."
    )
  })

const initialMessages = chat.get(0)
const connection = chat.transport({ delayMs: 20 })

function groupParts(parts: UIMessage["parts"]) {
  const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

  for (const part of parts) {
    const trace = part.type === "thinking"

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
  selector: "trace-thinking-tanstack-ai",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    ThinkingTrace,
    Trace,
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
                        track index;
                        let index = $index
                      ) {
                        <!-- A thinking part has no state: it runs while it is the streaming message's last part. -->
                        @if (part.type === "thinking") {
                          <kui-thinking-trace
                            [text]="part.content"
                            [running]="
                              live(message) && part === message.parts.at(-1)
                            "
                          />
                        }
                      }
                    </div>
                  } @else {
                    @for (part of run.parts; track $index) {
                      @if (part.type === "text") {
                        <p>{{ part.content }}</p>
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
export default class TraceThinkingTanstackAi {
  protected readonly chat = injectChat({
    initialMessages,
    connection,
    threadId: "trace-thinking",
  })
  protected readonly nextMessage = computed(() =>
    chat.next(this.chat.messages())
  )
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected readonly styles = styles
  protected readonly groupParts = groupParts
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected live(message: UIMessage) {
    return (
      this.chat.status() === "streaming" &&
      message === this.chat.messages().at(-1)
    )
  }

  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.append(next)
    else this.chat.setMessages(initialMessages)
  }
}
