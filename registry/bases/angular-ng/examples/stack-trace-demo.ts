import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChatMessage } from "../components/stack-trace-demo/types"
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
import { CommandRow } from "../components/stack-trace-demo/command-row"

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

const toolsOf = (message: ChatMessage) =>
  message.parts.filter((part) => part.type === "tool-runCommand")

@Component({
  selector: "stack-trace-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    CommandRow,
    Message,
    MessageContent,
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
                      <kui-command-row
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
export default class StackTraceDemo {
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
