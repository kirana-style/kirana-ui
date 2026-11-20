import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { injectChat } from "@tanstack/ai-angular"
import { tools } from "../components/chain-of-thought-demo-tanstack-ai/tools"
import type { ChatMessage } from "../components/chain-of-thought-demo-tanstack-ai/tools"
import type {
  ResultPart,
  StepPart,
} from "../components/chain-of-thought-demo-tanstack-ai/types"
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
import { ChainOfThought } from "../components/chain-of-thought-demo-tanstack-ai/chain-of-thought"

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

const chat = createChat<typeof tools>()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer
      .tool("readBuildLog", { input: { deployment: "dpl_8Kx2" } })
      .sleep(900)
      .output({
        log: "install    41s\ncompile    38s\nimages   3m 52s",
      })
    writer
      .tool("searchWeb", { input: { query: "next.js image cache key" } })
      .sleep(900)
      .output({
        results: [
          {
            title: "Image component | nextjs.org",
            url: "https://nextjs.org/docs/app/api-reference/components/image",
          },
          {
            title: "Build cache | vercel.com",
            url: "https://vercel.com/docs/deployments/troubleshoot-a-build",
          },
        ],
      })
    writer
      .tool("searchCode", { input: { query: "cacheKey" } })
      .sleep(900)
      .output({ files: ["next.config.ts", "scripts/optimize-images.ts"] })
    writer.text(
      "Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const stepsOf = (message: ChatMessage) =>
  message.parts.filter(
    (part): part is StepPart =>
      part.type === "tool-call" &&
      ["searchWeb", "readBuildLog", "searchCode"].includes(part.name)
  )

const resultsOf = (message: ChatMessage) =>
  message.parts.filter(
    (part): part is ResultPart => part.type === "tool-result"
  )

@Component({
  selector: "chain-of-thought-demo-tanstack-ai",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    ChainOfThought,
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
              <div kuiMessageContent [sx]="styles.messageContent">
                @if (stepsOf(message).length > 0) {
                  <kui-chain-of-thought
                    [steps]="stepsOf(message)"
                    [results]="resultsOf(message)"
                    [streaming]="streaming(message)"
                    [answering]="getMessageText(message).length > 0"
                  />
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
export default class ChainOfThoughtDemoTanstackAi {
  private readonly injector = inject(Injector)
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "chain-of-thought-demo",
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
  protected readonly stepsOf = stepsOf
  protected readonly resultsOf = resultsOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
