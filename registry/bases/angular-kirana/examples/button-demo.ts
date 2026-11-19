import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    flexDirection: { [breakpoint.md]: "row" },
  }),
}

@Component({
  selector: "button-demo",
  imports: [Button, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <button kuiButton variant="outline">Button</button>
        <button kuiButton variant="outline" size="icon" aria-label="Submit">
          <svg
            iconPlaceholder
            lucide="ArrowUpIcon"
            tabler="IconArrowUp"
            hugeicons="ArrowUp02Icon"
            phosphor="ArrowUpIcon"
            remixicon="RiArrowUpLine"
          ></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonDemo {
  protected readonly styles = styles
  protected readonly page = page
}
