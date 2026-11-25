import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Rating } from "../ui/rating"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
  score: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  count: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "rating-readonly",
  imports: [Rating, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.row">
        <div
          kuiRating
          size="sm"
          [allowHalf]="true"
          [readOnly]="true"
          [value]="4.5"
          aria-label="Average rating"
        ></div>
        <span [sx]="styles.score">4.5</span>
        <span [sx]="styles.count">(128 reviews)</span>
      </div>
    </div>
  `,
})
export default class RatingReadonly {
  protected readonly styles = styles
  protected readonly page = page
}
