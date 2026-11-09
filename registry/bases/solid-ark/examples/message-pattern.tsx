import { Markdown } from "../components/markdown/markdown"
import { MessageAction } from "../components/message-pattern/message-action"
import { createEffect, createSignal } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Message, MessageContent, MessageFooter } from "../ui/message"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function MessagePattern() {
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

  const [copied, setCopied] = createSignal(false)
  const [feedback, setFeedback] = createSignal<"like" | "dislike" | null>(null)
  // Back to "Copy" two seconds after a copy.
  createEffect(() => {
    if (!copied()) return
    const timeout = setTimeout(() => (setCopied(false), 2000))
    return () => clearTimeout(timeout)
  })

  function copy() {
    void navigator.clipboard.writeText(reply)
    setCopied(true)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Message align="end">
          <MessageContent sx={styles.messageContent}>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                How do I add a settings dialog? It should open from the gear
                icon in the header.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <MessageAction label="Copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </MessageAction>
              <MessageAction label="Edit">
                <IconPlaceholder
                  lucide="PencilIcon"
                  tabler="IconPencil"
                  hugeicons="EditIcon"
                  phosphor="PencilIcon"
                  remixicon="RiPencilLine"
                />
              </MessageAction>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent sx={styles.messageContent2}>
            <Markdown source={reply} />
            <MessageFooter sx={styles.messageFooter}>
              <MessageAction
                label={copied() ? "Copied" : "Copy"}
                onClick={copy}
              >
                {copied() ? (
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                ) : (
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                )}
              </MessageAction>
              <MessageAction
                label="Good response"
                aria-pressed={feedback() === "like"}
                onClick={() =>
                  setFeedback(feedback() === "like" ? null : "like")
                }
              >
                <IconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                  {...styleProps(
                    feedback() === "like" && styles.iconPlaceholder
                  )}
                />
              </MessageAction>
              <MessageAction
                label="Bad response"
                aria-pressed={feedback() === "dislike"}
                onClick={() =>
                  setFeedback(feedback() === "dislike" ? null : "dislike")
                }
              >
                <IconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                  {...styleProps(
                    feedback() === "dislike" && styles.iconPlaceholder2
                  )}
                />
              </MessageAction>
              <MessageAction label="Retry">
                <IconPlaceholder
                  lucide="RefreshCcwIcon"
                  tabler="IconRefresh"
                  hugeicons="ReloadIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </MessageAction>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
