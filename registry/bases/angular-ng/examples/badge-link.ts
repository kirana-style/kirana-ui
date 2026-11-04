import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Badge } from "../ui/badge"

@Component({
  selector: "badge-link",
  imports: [Badge, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <a kuiBadge href="#link">
        Open Link
        <svg
          iconPlaceholder
          lucide="ArrowUpRightIcon"
          tabler="IconArrowUpRight"
          hugeicons="ArrowUpRightIcon"
          phosphor="ArrowUpRightIcon"
          remixicon="RiArrowRightUpLine"
          data-icon="inline-end"
        ></svg>
      </a>
    </div>
  `,
})
export default class BadgeLink {
  protected readonly page = page
}
