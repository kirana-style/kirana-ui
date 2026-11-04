import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontFamily,
  fontWeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"

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

@Component({
  selector: "bubble-variants",
  imports: [Bubble, BubbleContent, BubbleReactions, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.list">
        <div kuiBubble>
          <div kuiBubbleContent>This is the default primary bubble.</div>
        </div>
        <div kuiBubble variant="secondary" align="end">
          <div kuiBubbleContent>This is the secondary variant.</div>
        </div>
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>
            This one is muted. It uses a lower emphasis color for the chat
            bubble.
          </div>
          <div kuiBubbleReactions role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </div>
        </div>
        <div kuiBubble variant="tinted" align="end">
          <div kuiBubbleContent>
            This one is tinted. The tint is a softer color derived from the
            primary color.
          </div>
        </div>
        <div kuiBubble variant="outline">
          <div kuiBubbleContent>We can also use an outlined variant.</div>
        </div>
        <div kuiBubble variant="destructive" align="end">
          <div kuiBubbleContent>Or a destructive variant with a reaction.</div>
          <div kuiBubbleReactions role="img" aria-label="Reaction: fire">
            <span>🔥</span>
          </div>
        </div>
        <div kuiBubble variant="ghost">
          <div kuiBubbleContent>
            <div [sx]="styles.markdown">
              <p>
                Ghost bubbles work for assistant text,
                <strong [sx]="styles.strong">markdown</strong>
                , and other content that should not be framed.
              </p>
              <p>
                This is perfect for assistant messages that should not have a
                frame and can take the full width of the container. You can also
                render
                <code [sx]="styles.code">code</code>
                in it.
              </p>
              <p>
                Ghost bubbles are full width and can take the full width of the
                container.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleVariants {
  protected readonly styles = styles
  protected readonly page = page
}
