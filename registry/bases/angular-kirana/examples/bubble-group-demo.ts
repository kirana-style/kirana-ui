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
  selector: "bubble-group-demo",
  imports: [Bubble, BubbleContent, BubbleGroup, BubbleReactions, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>Can you tell me what's the issue?</div>
        </div>
        <div kuiBubbleGroup>
          <div kuiBubble align="end">
            <div kuiBubbleContent>You tell me!</div>
          </div>
          <div kuiBubble align="end">
            <div kuiBubbleContent>It worked yesterday. You broke it!</div>
          </div>
          <div kuiBubble align="end">
            <div kuiBubbleContent>Find the bug and fix it.</div>
            <div kuiBubbleReactions aria-label="Reactions: eyes" align="start">
              <span>👀</span>
            </div>
          </div>
        </div>
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>
            Want me to diff yesterday's you against today's you? It's a bit
            embarrassing.
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleGroupDemo {
  protected readonly styles = styles
  protected readonly page = page
}
