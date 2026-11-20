<script setup lang="ts">
/**
 * Upstream's `MessageAnimated` (`@/components/message-animated`), which its helper demos draw each
 * message with: the message's bubbles, one paragraph per blank-line break, its reasoning in a
 * muted block above them. A user's message plays upstream's Slide Up entrance (CSS keyframes in
 * place of Motion's variants); an assistant's streams in place. Message Scroller has no Vue
 * version, so it is a plain item in the list.
 */
import { css, keyframes, select } from "@kirana-style/core"
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { Bubble, BubbleContent } from "../../ui/bubble"
import { Message, MessageContent } from "../../ui/message"

/** A chat message: the AI SDK's parts carry `text`, TanStack AI's `content`. */
export type MessageAnimatedMessage = {
  id: string
  role: string
  parts: ReadonlyArray<{ type: string; text?: unknown; content?: unknown }>
}

const slideUpFrom = keyframes({ from: { opacity: 0, translate: "0 10px" } })

const styles = {
  // Upstream's Slide Up preset, none without motion.
  entrance: css({
    animationName: {
      base: slideUpFrom,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationDuration: "260ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  }),
  // `space-y-2`.
  paragraphs: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
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
  // `mb-1 flex items-center gap-1.5 text-xs font-medium`.
  reasoningTitle: css({
    marginBottom: space[1],
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  }),
  reasoningIcon: css({ width: space["3.5"], height: space["3.5"] }),
  // `space-y-1.5 text-sm`.
  reasoningBody: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    [select.child(":not(:last-child)")]: { marginBottom: space["1.5"] },
  }),
}

const { message } = defineProps<{ message: MessageAnimatedMessage }>()

const user = computed(() => message.role === "user")

/** The message's text and reasoning, each with its paragraphs. */
const parts = computed(() =>
  message.parts.flatMap((part, index) => {
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
    if (!type || text === null) return []
    return [
      {
        key: `${message.id}-${index}`,
        type,
        paragraphs: text
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      },
    ]
  })
)
</script>

<template>
  <div :sx="user && styles.entrance">
    <Message :align="user ? 'end' : 'start'">
      <MessageContent>
        <template v-for="part in parts" :key="part.key">
          <div v-if="part.type === 'reasoning'" :sx="styles.reasoning">
            <div :sx="styles.reasoningTitle">
              <IconPlaceholder
                lucide="BrainIcon"
                tabler="IconBrain"
                hugeicons="AiBrainIcon"
                phosphor="BrainIcon"
                remixicon="RiBrainLine"
                :sx="styles.reasoningIcon"
              />
              Reasoning
            </div>
            <div :sx="styles.reasoningBody">
              <p
                v-for="(paragraph, index) in part.paragraphs"
                :key="index"
                :sx="styles.paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
          <Bubble v-else :variant="user ? 'muted' : 'ghost'">
            <BubbleContent :sx="styles.paragraphs">
              <p
                v-for="(paragraph, index) in part.paragraphs"
                :key="index"
                :sx="styles.paragraph"
              >
                {{ paragraph }}
              </p>
            </BubbleContent>
          </Bubble>
        </template>
      </MessageContent>
    </Message>
  </div>
</template>
