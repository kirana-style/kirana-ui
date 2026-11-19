import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

@Component({
  selector: "button-icon",
  imports: [Button, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="outline" size="icon">
        <svg
          iconPlaceholder
          lucide="CircleFadingArrowUpIcon"
          tabler="IconCircleArrowUp"
          hugeicons="CircleArrowUp02Icon"
          phosphor="ArrowCircleUpIcon"
          remixicon="RiArrowUpCircleLine"
        ></svg>
      </button>
    </div>
  `,
})
export default class ButtonIcon {
  protected readonly page = page
}
