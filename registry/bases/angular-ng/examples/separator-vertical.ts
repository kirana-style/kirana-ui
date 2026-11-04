import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Separator } from "../ui/separator"

const styles = {
  div: css({
    display: "flex",
    height: space[5],
    alignItems: "center",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

@Component({
  selector: "separator-vertical",
  imports: [Separator, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div>Blog</div>
        <div kuiSeparator orientation="vertical"></div>
        <div>Docs</div>
        <div kuiSeparator orientation="vertical"></div>
        <div>Source</div>
      </div>
    </div>
  `,
})
export default class SeparatorVertical {
  protected readonly styles = styles
  protected readonly page = page
}
