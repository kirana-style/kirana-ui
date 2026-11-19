import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent, MessageFooter } from "../ui/message"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  gap2: css({ gap: { "*": null, base: space[2] } }),
  fontNormalTextDestructiv: css({
    fontWeight: { "*": null, base: fontWeight.normal },
    color: theme.destructive,
  }),
}

@Component({
  selector: "message-actions",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    MessageFooter,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMessage>
          <div kuiMessageContent>
            <div kuiBubble variant="muted">
              <div kuiBubbleContent>
                The install failure is coming from the workspace package.
              </div>
            </div>
            <div kuiMessageFooter>
              <button
                kuiButton
                variant="ghost"
                size="icon"
                aria-label="Copy"
                title="Copy"
              >
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="ghost"
                size="icon"
                aria-label="Like"
                title="Like"
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="ghost"
                size="icon"
                aria-label="Dislike"
                title="Dislike"
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
        <div kuiMessage align="end">
          <div kuiMessageContent>
            <div kuiBubble>
              <div kuiBubbleContent>Okay drop me a link. Taking a look...</div>
            </div>
            <div kuiMessageFooter [sx]="styles.gap2">
              <span [sx]="styles.fontNormalTextDestructiv">Failed to send</span>
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                title="Retry"
                aria-label="Retry"
              >
                <svg
                  iconPlaceholder
                  lucide="RefreshCcwIcon"
                  tabler="IconRefresh"
                  hugeicons="ReloadIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessageActions {
  protected readonly styles = styles
  protected readonly page = page
}
