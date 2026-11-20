import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { injectChat } from "@tanstack/ai-angular"
import { tools } from "../components/terminal-demo-tanstack-ai/tools"
import type {
  ChatMessage,
  ToolPart,
  ToolResultPart,
} from "../components/terminal-demo-tanstack-ai/tools"
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
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { CommandRow } from "../components/terminal-demo-tanstack-ai/command-row"

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

const COMMANDS = [
  {
    id: "lint",
    command: "pnpm lint",
    output: ["> acme-chat@0.1.0 lint", "> eslint ."],
  },
  {
    id: "test",
    command: "pnpm test",
    output: [
      "> acme-chat@0.1.0 test",
      "> vitest run",
      "",
      " ✓ lib/ai.test.ts (6 tests) 41ms",
      " ✓ components/chat.test.tsx (9 tests) 212ms",
      "",
      " Test Files  2 passed (2)",
      "      Tests  15 passed (15)",
    ],
  },
  {
    id: "build",
    command: "pnpm build",
    output: [
      "> acme-chat@0.1.0 build",
      "> next build",
      "",
      "   ▲ Next.js 16.3.0",
      "   Creating an optimized production build ...",
      " ✓ Compiled successfully in 4.2s",
      " ✓ Generating static pages (12/12)",
      "",
      "Route (app)                Size  First Load JS",
      "┌ ○ /                     1.9 kB       112 kB",
      "└ ƒ /api/chat              141 B       102 kB",
    ],
  },
]

const chat = createChat<typeof tools>()
  .user("Run the checks, then build the app.")
  .assistant(({ writer }) => {
    for (const { id, command, output } of COMMANDS) {
      // A tool's output does not stream over AG-UI: the command's lines come with its result.
      writer
        .tool("runCommand", { toolCallId: id, input: { command } })
        .sleep(200 * output.length)
        .output({ exitCode: 0, output: output.join("\n") })
    }

    writer.text("Lint and tests pass, and the build compiled both routes.")
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const toolsOf = (message: ChatMessage) =>
  message.parts.filter(
    (part): part is ToolPart =>
      part.type === "tool-call" && part.name === "runCommand"
  )

// A call's result is a part of its own, beside it: a failed call's error is there.
const resultOf = (message: ChatMessage, toolCallId: string) =>
  message.parts.find(
    (part): part is ToolResultPart =>
      part.type === "tool-result" && part.toolCallId === toolCallId
  )

@Component({
  selector: "terminal-demo-tanstack-ai",
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
                @if (toolsOf(message).length > 0) {
                  <div kuiTrace>
                    @for (part of toolsOf(message); track part.id) {
                      <kui-command-row
                        [part]="part"
                        [result]="resultOf(message, part.id)"
                        [streaming]="streaming(message)"
                        [defaultOpen]="
                          busy() ? undefined : part === toolsOf(message).at(-1)
                        "
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
export default class TerminalDemoTanstackAi {
  private readonly injector = inject(Injector)
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "terminal-demo",
    tools,
  })
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages().at(-1)
  }
  protected replay() {
    this.chat.setMessages([])
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.append(question), {
      injector: this.injector,
    })
  }
  protected readonly styles = styles
  protected readonly toolsOf = toolsOf
  protected readonly resultOf = resultOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
