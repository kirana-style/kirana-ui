import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
    width: { "*": null, base: space[48] },
  }),
}

const notifications = {
  email: true,
  sms: false,
  push: true,
}

@Component({
  selector: "dropdown-menu-checkboxes-icons",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">
          Notifications
        </button>
        <div kuiDropdownMenuContent [sx]="styles.dropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>Notification Preferences</div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.email">
              <svg
                iconPlaceholder
                lucide="MailIcon"
                tabler="IconMail"
                hugeicons="Mail01Icon"
                phosphor="EnvelopeIcon"
                remixicon="RiMailLine"
              ></svg>
              Email notifications
            </div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.sms">
              <svg
                iconPlaceholder
                lucide="MessageSquareIcon"
                tabler="IconMessage"
                hugeicons="Message01Icon"
                phosphor="ChatIcon"
                remixicon="RiChat1Line"
              ></svg>
              SMS notifications
            </div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.push">
              <svg
                iconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
                phosphor="BellIcon"
                remixicon="RiNotificationLine"
              ></svg>
              Push notifications
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuCheckboxesIcons {
  protected readonly styles = styles
  protected readonly notifications = notifications
  protected readonly page = page
}
