import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { theme } from "../../../../../core/tokens"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"

const styles = {
  trigger: css({ backgroundColor: { '[aria-expanded="true"]': theme.muted } }),
  // The name over the address, each cut short to the room there is.
  text: css({
    display: "grid",
    flex: 1,
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  name: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  email: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  chevron: css({
    marginInlineStart: "auto",
    width: space[4],
    height: space[4],
  }),
  // `w-fit`, as upstream's bases write it.
  menu: css({ width: { "*": null, base: "fit-content" } }),
  // The label holds the whole account row, with no padding or weight of its own (`p-0
  // font-normal`, which win over every style's).
  label: css({
    paddingBlock: { "*": null, base: "0" },
    paddingInlineStart: { "*": null, base: "0" },
    paddingInlineEnd: { "*": null, base: "0" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  account: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[1],
    paddingBlock: space["1.5"],
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

@Component({
  selector: "kui-nav-user",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <ul kuiSidebarMenu>
      <li kuiSidebarMenuItem>
        <ng-container kuiDropdownMenu>
          <button
            kuiSidebarMenuButton
            kuiDropdownMenuTrigger
            size="lg"
            [sx]="styles.trigger"
          >
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="user().avatar"
                [attr.alt]="user().name"
              />
              <span kuiAvatarFallback>CN</span>
            </span>
            <div [sx]="styles.text">
              <span [sx]="styles.name">{{ user().name }}</span>
              <span [sx]="styles.email">{{ user().email }}</span>
            </div>
            <svg
              iconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              [sx]="styles.chevron"
            ></svg>
          </button>
          <div
            kuiDropdownMenuContent
            [sx]="styles.menu"
            [side]="isMobile() ? 'bottom' : 'right'"
            align="end"
            [sideOffset]="4"
          >
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel [sx]="styles.label">
                <div [sx]="styles.account">
                  <span kuiAvatar>
                    <img
                      kuiAvatarImage
                      [attr.src]="user().avatar"
                      [attr.alt]="user().name"
                    />
                    <span kuiAvatarFallback>CN</span>
                  </span>
                  <div [sx]="styles.text">
                    <span [sx]="styles.name">{{ user().name }}</span>
                    <span [sx]="styles.email">{{ user().email }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="SparklesIcon"
                  tabler="IconSparkles"
                  hugeicons="SparklesIcon"
                  phosphor="SparkleIcon"
                  remixicon="RiSparklingLine"
                ></svg>
                Upgrade to Pro
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
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
              Log out
            </div>
          </div>
        </ng-container>
      </li>
    </ul>
  `,
})
export class NavUser {
  readonly user = input.required<{
    name: string
    email: string
    avatar: string
  }>()
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly styles = styles
}
