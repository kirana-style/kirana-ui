import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "dropdown-menu-submenu",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
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
        <div kuiDropdownMenuContent>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>Team</div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger>Invite users</div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuItem>Email</div>
                  <div kuiDropdownMenuItem>Message</div>
                  <ng-container kuiDropdownMenuSub>
                    <div kuiDropdownMenuSubTrigger>More options</div>
                    <ng-container kuiDropdownMenuPortal>
                      <div kuiDropdownMenuSubContent>
                        <div kuiDropdownMenuItem>Calendly</div>
                        <div kuiDropdownMenuItem>Slack</div>
                        <div kuiDropdownMenuSeparator></div>
                        <div kuiDropdownMenuItem>Webhook</div>
                      </div>
                    </ng-container>
                  </ng-container>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuItem>Advanced...</div>
                </div>
              </ng-container>
            </ng-container>
            <div kuiDropdownMenuItem>
              New Team
              <span kuiDropdownMenuShortcut>⌘+T</span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuSubmenu {
  protected readonly page = page
}
