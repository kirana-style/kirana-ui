/**
 * Upstream's `MessageAnimated` (`@/components/message-animated`), which its chat demos draw each
 * message with: a message scroller item holding the message's bubble, one paragraph per blank-line
 * break. A user's message plays its preset's entrance (`message-animations.ts`, CSS keyframes in
 * place of Motion's variants) and anchors the scroll; an assistant's streams in place. It takes
 * the AI SDK's messages and TanStack AI's alike: a text part's `text` or `content`, and a
 * `reasoning` or `thinking` part drawn as upstream's Reasoning block.
 */
import * as React from "react"
import { css, select } from "@kirana-style/core"
import type { Sx } from "../../../lib/sx"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Message, MessageContent } from "../ui/message"
import { MessageScrollerItem } from "../ui/message-scroller"
import { MESSAGE_ANIMATIONS } from "./message-animations"
import type { MessageAnimationPreset } from "./message-animations"

const styles = {
  // `space-y-2`.
  paragraphs: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  // `whitespace-pre-wrap`.
  paragraph: css({ whiteSpace: "pre-wrap" }),
  // `w-full border-l-2 border-muted-foreground/30 pl-3 text-muted-foreground`.
  reasoning: css({
    width: "100%",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
    paddingLeft: space[3],
    color: theme.mutedForeground,
  }),
  // `mb-1 flex items-center gap-1.5 text-xs font-medium`, its icon `size-3.5`.
  reasoningTitle: css({
    marginBottom: space[1],
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    [select.child("svg")]: { width: space["3.5"], height: space["3.5"] },
  }),
  // `space-y-1.5 text-sm`.
  reasoningText: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    [select.child(":not(:last-child)")]: { marginBottom: space["1.5"] },
  }),
}

/**
 * A chat message, its text in parts or whole: an AI SDK `UIMessage` (a part's `text`) or a TanStack
 * AI one (its `content`).
 */
type MessageAnimatedMessage = {
  id: string
  role: string
  text?: string
  parts?: ReadonlyArray<{ type: string; text?: unknown; content?: unknown }>
}

/** What a message shows: its text parts, and its reasoning (the AI SDK) or thinking (TanStack AI). */
function contentPartsOf(message: MessageAnimatedMessage) {
  if (message.parts) {
    return message.parts.flatMap((part, index) => {
      const type =
        part.type === "reasoning" || part.type === "thinking"
          ? "reasoning"
          : part.type === "text"
            ? "text"
            : null
      const text =
        typeof part.text === "string"
          ? part.text
          : typeof part.content === "string"
            ? part.content
            : null
      return type && text !== null
        ? [{ key: `${message.id}-${index}`, type, text }]
        : []
    })
  }
  return typeof message.text === "string"
    ? [{ key: `${message.id}-text`, type: "text", text: message.text }]
    : []
}

function paragraphsOf(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function MessageAnimated({
  message,
  animationPreset = MESSAGE_ANIMATIONS["slide-up"],
  assistantVariant = "ghost",
  scrollAnchor,
  userVariant = "muted",
  sx,
}: {
  message: MessageAnimatedMessage
  animationPreset?: MessageAnimationPreset
  assistantVariant?: React.ComponentProps<typeof Bubble>["variant"]
  scrollAnchor?: boolean
  userVariant?: React.ComponentProps<typeof Bubble>["variant"]
  sx?: Sx
}) {
  const isUserMessage = message.role === "user"
  // The preset the message entered with: Motion plays `initial` once, at mount, where a changed
  // animation name would play again.
  const [entrance] = React.useState(animationPreset)

  return (
    <MessageScrollerItem
      messageId={message.id}
      scrollAnchor={isUserMessage ? (scrollAnchor ?? true) : scrollAnchor}
      sx={[isUserMessage && entrance.sx, sx]}
    >
      <Message align={isUserMessage ? "end" : "start"}>
        <MessageContent>
          {contentPartsOf(message).map((part) =>
            part.type === "reasoning" ? (
              <div key={part.key} sx={styles.reasoning}>
                <div sx={styles.reasoningTitle}>
                  <IconPlaceholder
                    lucide="BrainIcon"
                    tabler="IconBrain"
                    hugeicons="AiBrainIcon"
                    phosphor="BrainIcon"
                    remixicon="RiBrainLine"
                  />
                  Reasoning
                </div>
                <div sx={styles.reasoningText}>
                  {paragraphsOf(part.text).map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} sx={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <Bubble
                key={part.key}
                variant={isUserMessage ? userVariant : assistantVariant}
              >
                <BubbleContent sx={styles.paragraphs}>
                  {paragraphsOf(part.text).map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} sx={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </BubbleContent>
              </Bubble>
            )
          )}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

export { MessageAnimated, type MessageAnimatedMessage }
