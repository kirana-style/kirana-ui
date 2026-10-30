/**
 * Upstream's `bubble-variants`: each `variant` of the bubble. The ghost bubble's content is
 * markdown on upstream's site, rendered by its own `Markdown` (Streamdown); here it is the same
 * three paragraphs written out, with their bold word and inline code.
 */
import { css } from "@kirana-style/core"

import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import {
  containerSize,
  fontFamily,
  fontWeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  // `flex w-full max-w-sm flex-col gap-12 py-12`.
  list: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[12],
    paddingBlock: space[12],
  }),
  // What the markdown renders: its paragraphs apart.
  markdown: css({
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: space[4],
  }),
  strong: css({ fontWeight: fontWeight.semibold }),
  // The markdown's inline code: `rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]`.
  code: css({
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
    paddingInline: space[1],
    paddingBlock: space["0.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.9em",
  }),
}

export default function BubbleVariantsDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.list}>
        <Bubble>
          <BubbleContent>This is the default primary bubble.</BubbleContent>
        </Bubble>
        <Bubble variant="secondary" align="end">
          <BubbleContent>This is the secondary variant.</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            This one is muted. It uses a lower emphasis color for the chat
            bubble.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>
            This one is tinted. The tint is a softer color derived from the
            primary color.
          </BubbleContent>
        </Bubble>
        <Bubble variant="outline">
          <BubbleContent>We can also use an outlined variant.</BubbleContent>
        </Bubble>
        <Bubble variant="destructive" align="end">
          <BubbleContent>
            Or a destructive variant with a reaction.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="Reaction: fire">
            <span>🔥</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="ghost">
          <BubbleContent>
            <div sx={styles.markdown}>
              <p>
                Ghost bubbles work for assistant text,{" "}
                <strong sx={styles.strong}>markdown</strong>, and other content
                that should not be framed.
              </p>
              <p>
                This is perfect for assistant messages that should not have a
                frame and can take the full width of the container. You can also
                render <code sx={styles.code}>code</code> in it.
              </p>
              <p>
                Ghost bubbles are full width and can take the full width of the
                container.
              </p>
            </div>
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  )
}
