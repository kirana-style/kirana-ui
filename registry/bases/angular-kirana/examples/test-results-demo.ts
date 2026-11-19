import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChatMessage } from "../components/test-results-demo/types"
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
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { TestResultsRow } from "../components/test-results-demo/test-results-row"

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

const chat = createChat<ChatMessage>()
  .user("Run the checkout tests.")
  .assistant(({ writer }) => {
    writer
      .tool("runTests", { input: { command: "pnpm test checkout" } })
      .sleep(1500)
      .output({
        suites: [
          {
            name: "cart.test.ts",
            tests: [
              { name: "adds an item", status: "passed" },
              { name: "removes an item", status: "passed" },
              { name: "applies a discount code", status: "passed" },
            ],
          },
          {
            name: "payment.test.ts",
            tests: [
              { name: "charges the saved card", status: "passed" },
              {
                name: "retries a declined card",
                status: "failed",
                error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
              },
            ],
          },
        ],
      })
    writer.text(
      "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

const toolsOf = (message: ChatMessage) =>
  message.parts.filter((part) => part.type === "tool-runTests")

@Component({
  selector: "test-results-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    TestResultsRow,
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
                @if (toolsOf(message).length > 0) {
                  <div kuiTrace>
                    @for (part of toolsOf(message); track part.toolCallId) {
                      <kui-test-results-row
                        [part]="part"
                        [streaming]="streaming(message)"
                      />
                    }
                  </div>
                }
                @if (getMessageText(message)) {
                  <p>{{ getMessageText(message) }}</p>
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
            (click)="replay()"
          >
            Replay
          </button>
        }
      </div>
    </div>
  `,
})
export default class TestResultsDemo {
  private readonly injector = inject(Injector)
  protected readonly chat = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages.at(-1)
  }
  protected replay() {
    this.chat.messages = []
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.sendMessage(question), {
      injector: this.injector,
    })
  }
  protected readonly styles = styles
  protected readonly toolsOf = toolsOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
