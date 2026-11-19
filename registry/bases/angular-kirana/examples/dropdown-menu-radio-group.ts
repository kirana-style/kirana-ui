import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  demoDropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
}

@Component({
  selector: "dropdown-menu-radio-group",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
        <div kuiDropdownMenuContent [sx]="styles.demoDropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>Panel Position</div>
            <div kuiDropdownMenuRadioGroup [(value)]="position">
              <div kuiDropdownMenuRadioItem value="top">Top</div>
              <div kuiDropdownMenuRadioItem value="bottom">Bottom</div>
              <div kuiDropdownMenuRadioItem value="right">Right</div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuRadioGroupExample {
  protected readonly position = signal("bottom")
  protected readonly styles = styles
  protected readonly page = page
}
