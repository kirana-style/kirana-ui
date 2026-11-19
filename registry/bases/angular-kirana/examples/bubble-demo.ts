import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../ui/bubble"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "bubble-demo",
  imports: [Bubble, BubbleContent, BubbleGroup, BubbleReactions, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble align="end">
          <div kuiBubbleContent>Hey there! what's up?</div>
        </div>
        <div kuiBubbleGroup>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>Hey! Want to see chat bubbles?</div>
          </div>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>
              I can group messages, switch sides, and keep the whole thread easy
              to scan.
            </div>
            <div kuiBubbleReactions role="img" aria-label="Reaction: thumbs up">
              <span>👍</span>
            </div>
          </div>
        </div>
        <div kuiBubble align="end">
          <div kuiBubbleContent>Sure. Hit me with your best demo.</div>
        </div>
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>
            Yes. You are reading a demo that is demoing itself. Very meta. Very
            on-brand.
          </div>
          <div
            kuiBubbleReactions
            role="img"
            aria-label="Reactions: thumbs up, fire, eyes, and 2 more"
          >
            <span>👍</span>
            <span>🔥</span>
            <span>👀</span>
            <span>+2</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleDemo {
  protected readonly styles = styles
  protected readonly page = page
}
