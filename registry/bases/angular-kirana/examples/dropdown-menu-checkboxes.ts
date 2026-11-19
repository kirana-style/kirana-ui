import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
}

@Component({
  selector: "dropdown-menu-checkboxes",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
        <div kuiDropdownMenuContent [sx]="styles.dropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>Appearance</div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="showStatusBar">
              Status Bar
            </div>
            <div
              kuiDropdownMenuCheckboxItem
              [(checked)]="showActivityBar"
              disabled
            >
              Activity Bar
            </div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="showPanel">Panel</div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuCheckboxes {
  protected readonly showStatusBar = signal(true)
  protected readonly showActivityBar = signal(false)
  protected readonly showPanel = signal(false)
  protected readonly styles = styles
  protected readonly page = page
}
