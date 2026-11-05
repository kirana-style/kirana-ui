import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  button: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
}

@Component({
  selector: "avatar-dropdown",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button
          kuiButton
          kuiDropdownMenuTrigger
          variant="ghost"
          size="icon"
          [sx]="styles.button"
        >
          <span kuiAvatar>
            <img
              kuiAvatarImage
              [attr.src]="'/avatars/kirana.png'"
              alt="kirana"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
        </button>
        <div kuiDropdownMenuContent [sx]="styles.dropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>Profile</div>
            <div kuiDropdownMenuItem>Billing</div>
            <div kuiDropdownMenuItem>Settings</div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem variant="destructive">Log out</div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class AvatarDropdown {
  protected readonly styles = styles
  protected readonly page = page
}
