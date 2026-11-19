import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item"
import { Spinner } from "../ui/spinner"

const styles = {
  flexWFullMaxWXsFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
    [radiusBase.value]: "1rem",
  }),
  lineClamp1: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  flexNoneJustifyEnd: css({ flex: "none", justifyContent: "flex-end" }),
  textSmTabularNums: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontVariantNumeric: "tabular-nums",
  }),
}

@Component({
  selector: "spinner-demo",
  imports: [Item, ItemContent, ItemMedia, ItemTitle, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWXsFlexColGa">
        <div kuiItem variant="muted">
          <div kuiItemMedia>
            <svg kuiSpinner></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle [sx]="styles.lineClamp1">
              Processing payment...
            </div>
          </div>
          <div kuiItemContent [sx]="styles.flexNoneJustifyEnd">
            <span [sx]="styles.textSmTabularNums">$100.00</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SpinnerDemo {
  protected readonly styles = styles
  protected readonly page = page
}
