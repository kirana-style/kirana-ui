/**
 * Upstream's `MessageAnimated`, which its helper demos draw each message with: the message's
 * bubble, one paragraph per blank-line break, its reasoning drawn as upstream's Reasoning block. A
 * user's message plays upstream's default entrance (Slide Up, CSS keyframes in place of Motion's
 * variants); an assistant's streams in place. It takes the AI SDK's messages and TanStack AI's
 * alike: a text part's `text` or `content`, and a `reasoning` or `thinking` part.
 */
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes, select } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Bubble, BubbleContent } from "../../ui/bubble"
import { Message, MessageContent } from "../../ui/message"

const REDUCED = "@media (prefers-reduced-motion: reduce)"
const slideUpFrom = keyframes({ from: { opacity: 0, translate: "0 10px" } })

const styles = {
  // Upstream's Slide Up preset: Motion's variants there, a keyframe here.
  entrance: css({
    animationName: { base: slideUpFrom, [REDUCED]: "none" },
    animationDuration: "260ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  }),
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
 * A chat message: an AI SDK `UIMessage` (a part's `text`) or a TanStack AI one (its `content`).
 */
export type MessageAnimatedMessage = {
  id: string
  role: string
  parts: ReadonlyArray<{ type: string; text?: unknown; content?: unknown }>
}

/** What a message shows: its text parts, and its reasoning (the AI SDK) or thinking (TanStack AI). */
function contentPartsOf(message: MessageAnimatedMessage) {
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
      ? [
          {
            key: `${message.id}-${index}`,
            type,
            paragraphs: paragraphsOf(text),
          },
        ]
      : []
  })
}

function paragraphsOf(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

@Component({
  selector: "kui-message-animated",
  imports: [
    Bubble,
    BubbleContent,
    Message,
    MessageContent,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kuiMessage
      [align]="user() ? 'end' : 'start'"
      [sx]="user() ? styles.entrance : undefined"
    >
      <div kuiMessageContent>
        @for (part of parts(); track part.key) {
          @if (part.type === "reasoning") {
            <div [sx]="styles.reasoning">
              <div [sx]="styles.reasoningTitle">
                <svg
                  iconPlaceholder
                  lucide="BrainIcon"
                  tabler="IconBrain"
                  hugeicons="AiBrainIcon"
                  phosphor="BrainIcon"
                  remixicon="RiBrainLine"
                ></svg>
                Reasoning
              </div>
              <div [sx]="styles.reasoningText">
                @for (paragraph of part.paragraphs; track $index) {
                  <p [sx]="styles.paragraph">{{ paragraph }}</p>
                }
              </div>
            </div>
          } @else {
            <div kuiBubble [variant]="user() ? 'muted' : 'ghost'">
              <div kuiBubbleContent [sx]="styles.paragraphs">
                @for (paragraph of part.paragraphs; track $index) {
                  <p [sx]="styles.paragraph">{{ paragraph }}</p>
                }
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class MessageAnimated {
  readonly message = input.required<MessageAnimatedMessage>()
  protected readonly user = computed(() => this.message().role === "user")
  protected readonly parts = computed(() => contentPartsOf(this.message()))
  protected readonly styles = styles
}
