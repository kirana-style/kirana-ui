import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[12] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "bubble-reactions",
  imports: [Bubble, BubbleContent, BubbleReactions, Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="muted" align="end">
          <div kuiBubbleContent>I don't need tests, I know my code works.</div>
          <div
            kuiBubbleReactions
            align="start"
            role="img"
            aria-label="Reactions: thumbs up, surprised"
          >
            <span>👍</span>
            <span>😮</span>
          </div>
        </div>
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>
            Bold. Fine I'll add some tests. I'll let you know when they're done.
          </div>
          <div
            kuiBubbleReactions
            role="img"
            aria-label="Reactions: eyes, rocket, and 2 more"
          >
            <span>👀</span>
            <span>🚀</span>
            <span>+2</span>
          </div>
        </div>
        <div kuiBubble variant="default" align="end">
          <div kuiBubbleContent>
            Tests passed on the first try. All 142 of them. Looking good!
          </div>
          <div
            kuiBubbleReactions
            side="top"
            align="start"
            role="img"
            aria-label="Reactions: party popper, clapping hands"
          >
            <span>🎉</span>
            <span>👏</span>
          </div>
        </div>
        <div kuiBubble variant="destructive">
          <div kuiBubbleContent>Are you sure I can run this command?</div>
          <div kuiBubbleReactions>
            <button
              kuiButton
              variant="ghost"
              size="xs"
              (click)="toast.success('You clicked yes, running command...')"
            >
              Yes, run it
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleReactionsExample {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
