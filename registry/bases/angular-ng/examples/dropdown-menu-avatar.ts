import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
}

@Component({
  selector: "dropdown-menu-avatar",
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
    IconPlaceholder,
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
            <span kuiAvatarFallback>LR</span>
          </span>
        </button>
        <div kuiDropdownMenuContent align="end">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="BadgeCheckIcon"
                tabler="IconRosetteDiscountCheck"
                hugeicons="CheckmarkBadgeIcon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleLine"
              ></svg>
              Account
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              ></svg>
              Billing
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
                phosphor="BellIcon"
                remixicon="RiNotificationLine"
              ></svg>
              Notifications
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuItem>
            <svg
              iconPlaceholder
              lucide="LogOutIcon"
              tabler="IconLogout"
              hugeicons="LogoutIcon"
              phosphor="SignOutIcon"
              remixicon="RiLogoutBoxLine"
            ></svg>
            Sign Out
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuAvatar {
  protected readonly styles = styles
  protected readonly page = page
}
