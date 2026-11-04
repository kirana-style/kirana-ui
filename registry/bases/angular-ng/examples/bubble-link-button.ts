import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent, BubbleGroup } from "../ui/bubble"

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
  selector: "bubble-link-button",
  imports: [Bubble, BubbleContent, BubbleGroup, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>How can I help you today?</div>
        </div>
        <div kuiBubbleGroup>
          <div kuiBubble variant="tinted" align="end">
            <button
              kuiBubbleContent
              (click)="() => toast('You clicked forgot password')"
            >
              I forgot my password
            </button>
          </div>
          <div kuiBubble variant="tinted" align="end">
            <button
              kuiBubbleContent
              (click)="() => toast('You clicked help with subscription')"
            >
              I need help with my subscription
            </button>
          </div>
          <div kuiBubble variant="tinted" align="end">
            <button
              kuiBubbleContent
              (click)="
                () => toast('You clicked something else. Talk to a human.')
              "
            >
              Something else. Talk to a human.
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleLinkButton {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
