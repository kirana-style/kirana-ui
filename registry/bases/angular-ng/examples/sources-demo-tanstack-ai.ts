import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { clientTools, injectChat } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"
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
import { Sources } from "../components/sources-demo-tanstack-ai/sources"

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

const sourceSchema = z.object({ url: z.string(), title: z.string().optional() })

// The server's tool, as the client takes it for its types: the server runs it.
const searchWeb = toolDefinition({
  name: "searchWeb",
  description: "Search the web.",
  inputSchema: z.object({ query: z.string() }),
  outputSchema: z.object({ sources: z.array(sourceSchema) }),
})

const tools = clientTools(searchWeb)

type ChatMessage = UIMessage<typeof tools>

// TanStack AI has no source parts: the sources are what the agent's search returned.
const chat = createChat<typeof tools>()
  .user("How do I start an Astro project with pnpm?")
  .assistant(({ writer }) => {
    writer
      .tool("searchWeb", { input: { query: "astro create project pnpm" } })
      .sleep(600)
      .output({
        sources: [
          {
            url: "https://docs.astro.build/en/install-and-setup/",
            title: "Install Astro | docs.astro.build",
          },
          {
            url: "https://www.npmjs.com/package/create-astro",
            title: "create-astro | npmjs.com",
          },
          {
            url: "https://docs.astro.build/en/install-and-setup/",
            title: "Install Astro | docs.astro.build",
          },
          {
            url: "https://pnpm.io/cli/create",
            title: "pnpm create | pnpm.io",
          },
        ],
      })
    writer.text(
      "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

@Component({
  selector: "sources-demo-tanstack-ai",
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
export default class SourcesDemoTanstackAi {
  private readonly injector = inject(Injector)
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "sources-demo",
    tools,
  })
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected readonly styles = styles
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages().at(-1)
  }

  // Each search's results, once each.
  protected sourcesOf(message: ChatMessage) {
    return message.parts
      .filter((part) => part.type === "tool-call")
      .filter((part) => part.name === "searchWeb" && part.state === "complete")
      .flatMap((part) => part.output?.sources ?? [])
      .filter(
        (part, index, all) =>
          all.findIndex((other) => other.url === part.url) === index
      )
  }

  protected replay() {
    this.chat.setMessages([])
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.append(question), {
      injector: this.injector,
    })
  }
}
