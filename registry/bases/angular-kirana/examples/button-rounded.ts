import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

const styles = {
  div: css({
    display: "flex",
    gap: space[2],
  }),
  button: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  button2: css({
    borderRadius: { "*": null, base: radius.full },
  }),
}

@Component({
  selector: "button-rounded",
  imports: [Button, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <button kuiButton [sx]="styles.button">Get Started</button>
        <button kuiButton variant="outline" size="icon" [sx]="styles.button2">
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
export default class ButtonRounded {
  protected readonly styles = styles
  protected readonly page = page
}
