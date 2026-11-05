import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming"
import { createChat, getMessageText } from "../../../lib/ai"
import { Markdown } from "../../../lib/angular/markdown"
import type { MarkdownComponents } from "../../../lib/angular/markdown"
import { Chat } from "../../../lib/angular/chat"
import {
  FenceOpen,
  MarkdownCode,
  MarkdownPre,
} from "../components/code-block-markdown"
import { css, select } from "@kirana-style/core"
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

const styles = {
  div: css({
    display: "flex",
    minHeight: "28rem",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // Streamdown's `space-y-4 whitespace-normal`, around the reply's blocks.
  markdown: css({
    whiteSpace: "normal",
    [select.child(":not(:last-child)")]: { marginBottom: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const response = `Wrap the value in a \`useDebounce\` hook. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`

const chat = createChat()
  .user("How do I debounce a search input in React?")
  .assistant(({ writer }) => {
    writer.text(response)
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 30 })

const extensions = [streamingMarkdownExtension()]

const fenceOpen = (text: string) =>
  (text.match(/^ {0,3}(?:`{3,}|~{3,})/gm)?.length ?? 0) % 2 === 1

const components = {
  code: MarkdownCode,
  pre: MarkdownPre,
} satisfies MarkdownComponents

@Component({
  selector: "code-block-markdown",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    FenceOpen,
    Markdown,
    Message,
    MessageContent,
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
              <div kuiMessageContent>
                <ng-container
                  [kuiFenceOpen]="
                    busy() &&
                    message === chat.messages.at(-1) &&
                    fenceOpen(getMessageText(message))
                  "
                >
                  <div
                    [sx]="styles.markdown"
                    [kuiMarkdown]="getMessageText(message)"
                    [components]="components"
                    [extensions]="extensions"
                  ></div>
                </ng-container>
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
export default class CodeBlockMarkdown {
  protected readonly chat = new Chat({ messages: transcript, transport })
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected readonly styles = styles
  protected readonly extensions = extensions
  protected readonly fenceOpen = fenceOpen
  protected readonly components = components
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected replay() {
    this.chat.messages = []
    void this.chat.sendMessage(question)
  }
}
