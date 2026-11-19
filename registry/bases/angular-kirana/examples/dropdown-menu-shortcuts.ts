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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "dropdown-menu-shortcuts",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
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
            <div kuiDropdownMenuItem>
              Profile
              <span kuiDropdownMenuShortcut>⇧⌘P</span>
            </div>
            <div kuiDropdownMenuItem>
              Billing
              <span kuiDropdownMenuShortcut>⌘B</span>
            </div>
            <div kuiDropdownMenuItem>
              Settings
              <span kuiDropdownMenuShortcut>⌘S</span>
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuItem>
            Log out
            <span kuiDropdownMenuShortcut>⇧⌘Q</span>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuShortcuts {
  protected readonly page = page
}
