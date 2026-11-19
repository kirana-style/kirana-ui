import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent } from "../ui/bubble"

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
  selector: "bubble-alignment",
  imports: [Bubble, BubbleContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>
            This bubble is aligned to the start. This is the default alignment.
          </div>
        </div>
        <div kuiBubble align="end">
          <div kuiBubbleContent>
            This bubble is aligned to the end. Use this for user messages.
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleAlignment {
  protected readonly styles = styles
  protected readonly page = page
}
