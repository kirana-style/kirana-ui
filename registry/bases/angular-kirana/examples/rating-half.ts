import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { Rating } from "../ui/rating"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  value: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

@Component({
  selector: "rating-half",
  imports: [Field, FieldLabel, Rating, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="rating-half-label">Sound quality</label>
        <div [sx]="styles.row">
          <div
            kuiRating
            aria-labelledby="rating-half-label"
            [allowHalf]="true"
            [value]="value()"
            (valueChange)="value.set($event ?? 0)"
          ></div>
          <span [sx]="styles.value">{{ value().toFixed(1) }} / 5</span>
        </div>
      </div>
    </div>
  `,
})
export default class RatingHalf {
  protected readonly value = signal(3.5)
  protected readonly styles = styles
  protected readonly page = page
}
