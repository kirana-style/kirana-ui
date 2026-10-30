import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import type { Selection } from "react-aria-components"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  dropdownMenu: css({
    width: { "*": null, base: space[48] },
  }),
}

export default function DropdownMenuCheckboxesIcons() {
  const [notifications, setNotifications] = React.useState<Selection>(
    new Set(["email", "push"])
  )

  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">Notifications</Button>
        <DropdownMenu sx={styles.dropdownMenu}>
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={notifications}
            onSelectionChange={setNotifications}
          >
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuItem id="email">
              <IconPlaceholder
                lucide="MailIcon"
                tabler="IconMail"
                hugeicons="Mail01Icon"
                phosphor="EnvelopeIcon"
                remixicon="RiMailLine"
              />
              Email notifications
            </DropdownMenuItem>
            <DropdownMenuItem id="sms">
              <IconPlaceholder
                lucide="MessageSquareIcon"
                tabler="IconMessage"
                hugeicons="Message01Icon"
                phosphor="ChatIcon"
                remixicon="RiChat1Line"
              />
              SMS notifications
            </DropdownMenuItem>
            <DropdownMenuItem id="push">
              <IconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
                phosphor="BellIcon"
                remixicon="RiNotificationLine"
              />
              Push notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
