import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Rating } from "../ui/rating"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}

@Component({
  selector: "rating-sizes",
  imports: [Rating, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div
          kuiRating
          size="sm"
          [defaultValue]="3"
          aria-label="Small rating"
        ></div>
        <div kuiRating [defaultValue]="3" aria-label="Default rating"></div>
        <div
          kuiRating
          size="lg"
          [defaultValue]="3"
          aria-label="Large rating"
        ></div>
      </div>
    </div>
  `,
})
export default class RatingSizes {
  protected readonly styles = styles
  protected readonly page = page
}
