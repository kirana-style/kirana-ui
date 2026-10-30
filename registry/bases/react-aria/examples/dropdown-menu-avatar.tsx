import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    borderRadius: { "*": null, base: radius.full },
  }),
}

export default function DropdownMenuAvatar() {
  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" sx={styles.button}>
          <Avatar>
            <AvatarImage src="/avatars/kirana.png" alt="kirana" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
        <DropdownMenu placement="bottom end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="BadgeCheckIcon"
                tabler="IconRosetteDiscountCheck"
                hugeicons="CheckmarkBadgeIcon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleLine"
              />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
                phosphor="BellIcon"
                remixicon="RiNotificationLine"
              />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="LogOutIcon"
              tabler="IconLogout"
              hugeicons="LogoutIcon"
              phosphor="SignOutIcon"
              remixicon="RiLogoutBoxLine"
            />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
