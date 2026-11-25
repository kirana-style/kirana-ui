import { For, Show } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { Bubble, BubbleContent } from "../../ui/bubble"
import { Message, MessageContent } from "../../ui/message"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import type { Sx } from "@kirana-style/core"
import type { UIMessage } from "ai"

/**
 * One message of the transcript: its thinking as a quoted block, its text as a bubble, each split
 * into paragraphs.
 */
export function MessageRow(props: {
  message: UIMessage
  sx?: Sx
  class?: string
}) {
  const local = props
  const styles = {
    reasoning: css({
      width: "100%",
      borderInlineStartWidth: "2px",
      borderInlineStartStyle: "solid",
      borderInlineStartColor: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
      paddingInlineStart: space[3],
      color: theme.mutedForeground,
    }),
    reasoningTitle: css({
      marginBottom: space[1],
      display: "flex",
      alignItems: "center",
      gap: space["1.5"],
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: fontWeight.medium,
    }),
    reasoningIcon: css({
      width: space["3.5"],
      height: space["3.5"],
    }),
    reasoningText: css({
      display: "flex",
      flexDirection: "column",
      gap: space["1.5"],
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    bubbleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[2] },
    }),
    paragraph: css({
      whiteSpace: "pre-wrap",
    }),
  }

  const user = () => local.message.role === "user"
  const paragraphs = (text: string) =>
    text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  const parts = () =>
    local.message.parts.flatMap((part) =>
      part.type === "reasoning" || part.type === "text"
        ? [{ type: part.type, text: part.text }]
        : []
    )

  return (
    <Message align={user() ? "end" : "start"}>
      <MessageContent>
        <For keyed={false} each={parts()}>
          {(part) => (
            <Show
              when={part().type === "reasoning"}
              fallback={
                <Bubble variant={user() ? "muted" : "ghost"}>
                  <BubbleContent sx={styles.bubbleContent}>
                    <For keyed={false} each={paragraphs(part().text)}>
                      {(paragraph) => (
                        <p sx={styles.paragraph}>{paragraph()}</p>
                      )}
                    </For>
                  </BubbleContent>
                </Bubble>
              }
            >
              <div sx={styles.reasoning}>
                <div sx={styles.reasoningTitle}>
                  <IconPlaceholder
                    lucide="BrainIcon"
                    tabler="IconBrain"
                    hugeicons="AiBrainIcon"
                    phosphor="BrainIcon"
                    remixicon="RiBrainLine"
                    {...styleProps(styles.reasoningIcon)}
                  />
                  Reasoning
                </div>
                <div sx={styles.reasoningText}>
                  <For keyed={false} each={paragraphs(part().text)}>
                    {(paragraph) => <p sx={styles.paragraph}>{paragraph()}</p>}
                  </For>
                </div>
              </div>
            </Show>
          )}
        </For>
      </MessageContent>
    </Message>
  )
}
