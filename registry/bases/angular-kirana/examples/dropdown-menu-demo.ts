import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
}

@Component({
  selector: "dropdown-menu-demo",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
        <div
          kuiDropdownMenuContent
          [sx]="styles.dropdownMenuContent"
          align="start"
        >
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
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>Team</div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger>Invite users</div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuItem>Email</div>
                  <div kuiDropdownMenuItem>Message</div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuItem>More...</div>
                </div>
              </ng-container>
            </ng-container>
            <div kuiDropdownMenuItem>
              New Team
              <span kuiDropdownMenuShortcut>⌘+T</span>
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>GitHub</div>
            <div kuiDropdownMenuItem>Support</div>
            <div kuiDropdownMenuItem disabled>API</div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <!-- Upstream's item, in the destructive colour the maintainer keeps for it. -->
            <div kuiDropdownMenuItem variant="destructive">
              Log out
              <span kuiDropdownMenuShortcut>⇧⌘Q</span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuDemo {
  protected readonly styles = styles
  protected readonly page = page
}
