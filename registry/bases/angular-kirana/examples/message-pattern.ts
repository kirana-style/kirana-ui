import { Component, effect, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Message, MessageContent, MessageFooter } from "../ui/message"
import { Markdown } from "../components/markdown"
import { MessageAction } from "../components/message-pattern/message-action"

const styles = {
  div: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[8],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[2] },
  }),
  messageContent2: css({
    gap: { "*": null, base: space[2] },
  }),
  messageFooter: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  iconPlaceholder: css({
    fill: "currentColor",
  }),
  iconPlaceholder2: css({
    fill: "currentColor",
  }),
}

const reply = `Install Dialog, then open it from the gear button in \`site-header.tsx\`.

\`\`\`bash
npx shadcn@latest add dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`

// Back to "Copy" two seconds after a copy.
@Component({
  selector: "message-pattern",
  imports: [
    Bubble,
    BubbleContent,
    Markdown,
    Message,
    MessageAction,
    MessageContent,
    MessageFooter,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiMessage align="end">
          <div kuiMessageContent [sx]="styles.messageContent">
            <div kuiBubble align="end" variant="muted">
              <div kuiBubbleContent>
                How do I add a settings dialog? It should open from the gear
                icon in the header.
              </div>
            </div>
            <div kuiMessageFooter>
              <kui-message-action label="Copy">
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              </kui-message-action>
              <kui-message-action label="Edit">
                <svg
                  iconPlaceholder
                  lucide="PencilIcon"
                  tabler="IconPencil"
                  hugeicons="EditIcon"
                  phosphor="PencilIcon"
                  remixicon="RiPencilLine"
                ></svg>
              </kui-message-action>
            </div>
          </div>
        </div>
        <div kuiMessage>
          <div kuiMessageContent [sx]="styles.messageContent2">
            <kui-markdown [source]="reply" />
            <div kuiMessageFooter [sx]="styles.messageFooter">
              <kui-message-action
                [label]="copied() ? 'Copied' : 'Copy'"
                (click)="copy()"
              >
                @if (copied()) {
                  <svg
                    iconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  ></svg>
                } @else {
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                }
              </kui-message-action>
              <kui-message-action
                label="Good response"
                [pressed]="feedback() === 'like'"
                (click)="feedback.set(feedback() === 'like' ? null : 'like')"
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                  [sx]="feedback() === 'like' && styles.iconPlaceholder"
                ></svg>
              </kui-message-action>
              <kui-message-action
                label="Bad response"
                [pressed]="feedback() === 'dislike'"
                (click)="
                  feedback.set(feedback() === 'dislike' ? null : 'dislike')
                "
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                  [sx]="feedback() === 'dislike' && styles.iconPlaceholder2"
                ></svg>
              </kui-message-action>
              <kui-message-action label="Retry">
                <svg
                  iconPlaceholder
                  lucide="RefreshCcwIcon"
                  tabler="IconRefresh"
                  hugeicons="ReloadIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                ></svg>
              </kui-message-action>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessagePattern {
  protected readonly copied = signal(false)
  protected readonly feedback = signal<"like" | "dislike" | null>(null)
  protected readonly styles = styles
  protected readonly reply = reply
  protected readonly page = page

  constructor() {
    // Back to "Copy" two seconds after a copy.
    effect((onCleanup) => {
      if (!this.copied()) return
      const timeout = setTimeout(() => this.copied.set(false), 2000)
      onCleanup(() => clearTimeout(timeout))
    })
  }

  protected copy() {
    void navigator.clipboard.writeText(reply)
    this.copied.set(true)
  }
}
