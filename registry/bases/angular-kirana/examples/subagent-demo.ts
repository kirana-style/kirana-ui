import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type {
  ChatMessage,
  SubagentMessage,
  SubagentPart,
} from "../components/subagent-demo/types"
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
import { SubagentRow } from "../components/subagent-demo/subagent-row"

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

const steps = [
  {
    command: "grep -rn cacheKey scripts",
    stdout:
      "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
  },
  {
    command: "sed -n 13,15p scripts/optimize-images.ts",
    stdout:
      'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
  },
  {
    command: "ls public/images | wc -l",
    stdout: "1240",
  },
]

function getSubagentMessage(done: number, report?: string): SubagentMessage {
  const parts = steps.slice(0, done).map((step, index): SubagentPart => ({
    type: "tool-runCommand",
    toolCallId: `step-${index}`,
    state: "output-available",
    input: { command: step.command },
    output: { stdout: step.stdout },
  }))

  if (done < steps.length) {
    parts.push({
      type: "tool-runCommand",
      toolCallId: `step-${done}`,
      state: "input-available",
      input: { command: steps[done].command },
    })
  }

  if (report) {
    parts.push({ type: "text", text: report })
  }

  return { id: "research-agent", role: "assistant", parts }
}

const chat = createChat<ChatMessage>()
  .user("Why does image optimization rerun on every deploy?")
  .assistant(({ writer }) => {
    const subagent = writer
      .tool("researchAgent", {
        input: {
          task: "Find out why image optimization reruns on every deploy.",
        },
      })
      .sleep(600)
    steps.forEach((_, index) => {
      subagent
        .output(getSubagentMessage(index), { preliminary: true })
        .sleep(1000)
    })
    subagent
      .output(
        getSubagentMessage(
          steps.length,
          "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again."
        )
      )
      .sleep(400)
    writer.text(
      "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

const agentsOf = (message: ChatMessage) =>
  message.parts.filter((part) => part.type === "tool-researchAgent")

@Component({
  selector: "subagent-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    SubagentRow,
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
                @if (agentsOf(message).length > 0) {
                  <div kuiTrace>
                    @for (part of agentsOf(message); track part.toolCallId) {
                      <kui-subagent-row
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
export default class SubagentDemo {
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
  protected readonly agentsOf = agentsOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
