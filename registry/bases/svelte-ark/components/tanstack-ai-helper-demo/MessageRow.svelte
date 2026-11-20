<script lang="ts">
  /**
   * Upstream's `MessageAnimated` for a TanStack AI message: its thinking as a reasoning block and its
   * text as a bubble, one paragraph per blank-line break. A user's message enters with upstream's
   * `slide-up` preset (CSS keyframes in place of Motion's variants); an assistant's streams in place.
   */
  import type { UIMessage } from "@tanstack/ai-svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { Bubble, BubbleContent } from "../../ui/bubble"
  import { Message, MessageContent } from "../../ui/message"
  import { css, keyframes, select } from "@kirana-style/core"
  import {
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"

  let { message }: { message: UIMessage } = $props()

  const slideUp = keyframes({ from: { opacity: 0, translate: "0 10px" } })

  const styles = {
    entrance: css({
      animationName: {
        base: slideUp,
        "@media (prefers-reduced-motion: reduce)": "none",
      },
      animationDuration: "260ms",
      animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    }),
    reasoning: css({
      width: "100%",
      borderLeftWidth: "2px",
      borderLeftStyle: "solid",
      borderLeftColor: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
      paddingLeft: space[3],
      color: theme.mutedForeground,
    }),
    reasoningLabel: css({
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
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      [select.child(":not(:last-child)")]: { marginBottom: space["1.5"] },
    }),
    paragraphs: css({
      [select.child(":not(:last-child)")]: { marginBottom: space[2] },
    }),
    paragraph: css({
      whiteSpace: "pre-wrap",
    }),
  }

  const user = $derived(message.role === "user")
  // TanStack AI's parts carry their text as `content`; its reasoning is a `thinking` part.
  const parts = $derived(
    message.parts.flatMap((part) =>
      part.type === "thinking" || part.type === "text"
        ? [{ reasoning: part.type === "thinking", text: part.content }]
        : []
    )
  )
  const paragraphs = (text: string) =>
    text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
</script>

<div sx={user && styles.entrance}>
  <Message align={user ? "end" : "start"}>
    <MessageContent>
      {#each parts as part, index (index)}
        {#if part.reasoning}
          <div sx={styles.reasoning}>
            <div sx={styles.reasoningLabel}>
              <IconPlaceholder lucide="BrainIcon" tabler="IconBrain" hugeicons="AiBrainIcon" phosphor="BrainIcon" remixicon="RiBrainLine" sx={styles.reasoningIcon} />
              Reasoning
            </div>
            <div sx={styles.reasoningText}>
              {#each paragraphs(part.text) as paragraph, paragraphIndex (paragraphIndex)}
                <p sx={styles.paragraph}>{paragraph}</p>
              {/each}
            </div>
          </div>
        {:else}
          <Bubble variant={user ? "muted" : "ghost"}>
            <BubbleContent sx={styles.paragraphs}>
              {#each paragraphs(part.text) as paragraph, paragraphIndex (paragraphIndex)}
                <p sx={styles.paragraph}>{paragraph}</p>
              {/each}
            </BubbleContent>
          </Bubble>
        {/if}
      {/each}
    </MessageContent>
  </Message>
</div>
