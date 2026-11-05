import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { createChat, getMessageText } from "../../../lib/ai"
import { Chat } from "../../../lib/angular/chat"
import { SourcesRow, ThinkingRow, ToolRow } from "../components/trace-demo"
import type { ChatMessage, Part } from "../components/trace-demo"
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

const chat = createChat<ChatMessage>()
  .user("Why does pnpm install fail in CI?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
      { delayMs: 40 }
    )
    writer
      .tool("runCommand", { input: { command: "pnpm --version" } })
      .sleep(700)
      .output({ stdout: "10.18.0" })
    writer
      .tool("runCommand", {
        input: {
          command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
        },
      })
      .sleep(900)
      .output({
        stdout:
          " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
      })
    writer
      .tool("runCommand", {
        input: { command: "pnpm install --frozen-lockfile" },
      })
      .sleep(1200)
      .error(
        'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
      )
    writer.sourceUrl({
      url: "https://pnpm.io/cli/install#--frozen-lockfile",
      title: "pnpm install | pnpm.io",
    })
    writer.sourceUrl({
      url: "https://pnpm.io/continuous-integration",
      title: "Continuous Integration | pnpm.io",
    })
    writer.sleep(1000)
    writer.text(
      "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

type Source = Extract<Part, { type: "source-url" }>

@Component({
  selector: "trace-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    SourcesRow,
    ThinkingRow,
    ToolRow,
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
                @if (
                  reply(message).rows.length + reply(message).sources.length > 0
                ) {
                  <div kuiTrace>
                    @for (
                      part of reply(message).rows;
                      track part.type === "tool-runCommand"
                        ? part.toolCallId
                        : index;
                      let index = $index
                    ) {
                      @if (part.type === "reasoning") {
                        <kui-thinking-row
                          [text]="part.text"
                          [running]="
                            reply(message).streaming &&
                            part.state === 'streaming'
                          "
                        />
                      } @else if (part.type === "tool-runCommand") {
                        <kui-tool-row
                          [part]="part"
                          [streaming]="reply(message).streaming"
                          [defaultOpen]="index === 2"
                        />
                      }
                    }
                    @if (reply(message).sources.length > 0) {
                      <kui-sources-row
                        [sources]="reply(message).sources"
                        [running]="
                          reply(message).streaming &&
                          reply(message).text.length === 0
                        "
                      />
                    }
                  </div>
                }
                @if (reply(message).text) {
                  <p>{{ reply(message).text }}</p>
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
export default class TraceDemo {
  protected readonly chat = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  /** What each assistant message draws: its trace's rows and sources, and its text. */
  protected readonly replies = computed(
    () =>
      new Map(
        this.chat.messages.map((message) => [
          message.id,
          {
            streaming: this.busy() && message === this.chat.messages.at(-1),
            rows: message.parts.filter(
              (part) =>
                part.type === "reasoning" || part.type === "tool-runCommand"
            ),
            sources: message.parts.filter(
              (part): part is Source => part.type === "source-url"
            ),
            text: getMessageText(message),
          },
        ])
      )
  )
  protected readonly styles = styles
  protected readonly getMessageText = getMessageText
  protected readonly page = page

  protected reply(message: ChatMessage) {
    return this.replies().get(message.id)!
  }

  protected replay() {
    this.chat.messages = []
    void this.chat.sendMessage(question)
  }
}
