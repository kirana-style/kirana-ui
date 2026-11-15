/**
 * Upstream's `MessageAnimated` (`@/components/message-animated`), which its chat demos draw each
 * message with: a message scroller item holding the message's bubble, one paragraph per blank-line
 * break. A user's message plays its preset's entrance (`message-animations.ts`, CSS keyframes in
 * place of Motion's variants) and anchors the scroll; an assistant's streams in place.
 * Upstream's reasoning parts are left out: the scripted chats here hold only text.
 */
import * as React from "react"
import { css, select } from "@kirana-style/core"
import type { Sx } from "../../../lib/sx"

import { space } from "../../../core/scales"
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
}

/** A chat message, its text in parts (an AI SDK `UIMessage`) or whole. */
type MessageAnimatedMessage = {
  id: string
  role: string
  text?: string
  parts?: ReadonlyArray<{ type: string; text?: string }>
}

/** The text a message shows, one entry per text part. */
function textsOf(message: MessageAnimatedMessage) {
  if (message.parts) {
    return message.parts.flatMap((part) =>
      part.type === "text" && typeof part.text === "string" ? [part.text] : []
    )
  }
  return typeof message.text === "string" ? [message.text] : []
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
          {textsOf(message).map((text, index) => (
            <Bubble
              key={`${message.id}-${index}`}
              variant={isUserMessage ? userVariant : assistantVariant}
            >
              <BubbleContent sx={styles.paragraphs}>
                {text
                  .split(/\n\s*\n/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} sx={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
              </BubbleContent>
            </Bubble>
          ))}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

export { MessageAnimated, type MessageAnimatedMessage }
