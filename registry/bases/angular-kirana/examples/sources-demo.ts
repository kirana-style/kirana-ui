import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
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
import { Message, MessageContent } from "../ui/message"
import { Sources } from "../components/sources-demo/sources"

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
  .user("How do I start an Astro project with pnpm?")
  .assistant(({ writer }) => {
    writer.text(
      "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
    )
    writer.sourceUrl({
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    })
    writer.sourceUrl({
      url: "https://www.npmjs.com/package/create-astro",
      title: "create-astro | npmjs.com",
    })
    writer.sourceUrl({
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    })
    writer.sourceUrl({
      url: "https://pnpm.io/cli/create",
      title: "pnpm create | pnpm.io",
    })
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

@Component({
  selector: "sources-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    Sources,
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
                @if (getMessageText(message)) {
                  <p>{{ getMessageText(message) }}</p>
                }
                @if (sourcesOf(message).length > 0) {
                  <kui-sources [sources]="sourcesOf(message)" />
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
export default class SourcesDemo {
  private readonly injector = inject(Injector)
  protected readonly chat = new Chat({ messages: transcript, transport })
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected readonly styles = styles
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected streaming(message: UIMessage) {
    return this.busy() && message === this.chat.messages.at(-1)
  }

  protected sourcesOf(message: UIMessage) {
    return message.parts
      .filter((part) => part.type === "source-url")
      .filter(
        (part, index, all) =>
          all.findIndex((other) => other.url === part.url) === index
      )
  }

  protected replay() {
    this.chat.messages = []
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.sendMessage(question), {
      injector: this.injector,
    })
  }
}
