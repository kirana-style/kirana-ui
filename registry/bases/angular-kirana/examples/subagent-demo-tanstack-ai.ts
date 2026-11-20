import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { injectChat } from "@tanstack/ai-angular"
import { tools } from "../components/subagent-demo-tanstack-ai/tools"
import type {
  AgentPart,
  ChatMessage,
} from "../components/subagent-demo-tanstack-ai/tools"
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
import { SubagentRow } from "../components/subagent-demo-tanstack-ai/subagent-row"

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

const chat = createChat<typeof tools>()
  .user("Why does image optimization rerun on every deploy?")
  .assistant(({ writer }) => {
    // A tool's output arrives once over AG-UI: the agent's steps come with its report.
    writer
      .tool("researchAgent", {
        input: {
          task: "Find out why image optimization reruns on every deploy.",
        },
      })
      .sleep(600 + 1000 * steps.length)
      .output({
        steps,
        report:
          "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again.",
      })
    writer.sleep(400)
    writer.text(
      "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const agentsOf = (message: ChatMessage) =>
  message.parts.filter(
    (part): part is AgentPart =>
      part.type === "tool-call" && part.name === "researchAgent"
  )

@Component({
  selector: "subagent-demo-tanstack-ai",
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
                @if (agentsOf(message).length > 0) {
                  <div kuiTrace>
                    @for (part of agentsOf(message); track part.id) {
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
export default class SubagentDemoTanstackAi {
  private readonly injector = inject(Injector)
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "subagent-demo",
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
  protected readonly agentsOf = agentsOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
