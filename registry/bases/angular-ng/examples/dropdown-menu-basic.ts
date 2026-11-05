import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "dropdown-menu-basic",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
        <div kuiDropdownMenuContent>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>My Account</div>
            <div kuiDropdownMenuItem>Profile</div>
            <div kuiDropdownMenuItem>Billing</div>
            <div kuiDropdownMenuItem>Settings</div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuItem>GitHub</div>
          <div kuiDropdownMenuItem>Support</div>
          <div kuiDropdownMenuItem disabled>API</div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuBasic {
  protected readonly page = page
}
