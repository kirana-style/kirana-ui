import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "dropdown-menu-icons",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
        <div kuiDropdownMenuContent>
          <div kuiDropdownMenuItem>
            <svg
              iconPlaceholder
              lucide="UserIcon"
              tabler="IconUser"
              hugeicons="UserIcon"
              phosphor="UserIcon"
              remixicon="RiUserLine"
            ></svg>
            Profile
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
              lucide="SettingsIcon"
              tabler="IconSettings"
              hugeicons="SettingsIcon"
              phosphor="TerminalIcon"
              remixicon="RiSettingsLine"
            ></svg>
            Settings
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuItem variant="destructive">
            <svg
              iconPlaceholder
              lucide="LogOutIcon"
              tabler="IconLogout"
              hugeicons="LogoutIcon"
              phosphor="SignOutIcon"
              remixicon="RiLogoutBoxLine"
            ></svg>
            Log out
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuIcons {
  protected readonly page = page
}
