import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
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
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navUserDiv: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  navUserSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
    width: space[4],
    height: space[4],
  }),
  dropdownMenuContent: css({
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  dropdownMenuLabel: css({
    padding: { "*": null, base: space["0"] },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[1],
    paddingBlock: space["1.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div3: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  span3: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  span4: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
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
            [sx]="styles.sidebarMenuButton"
          >
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="user().avatar"
                [attr.alt]="user().name"
              />
              <span kuiAvatarFallback>CN</span>
            </span>
            <div [sx]="styles.navUserDiv">
              <span [sx]="styles.navUserSpan">{{ user().name }}</span>
              <span [sx]="styles.span2">{{ user().email }}</span>
            </div>
            <svg
              iconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              [sx]="styles.iconPlaceholder"
            ></svg>
          </button>
          <div
            kuiDropdownMenuContent
            [sx]="styles.dropdownMenuContent"
            [side]="isMobile() ? 'bottom' : 'right'"
            align="start"
            [sideOffset]="4"
          >
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel [sx]="styles.dropdownMenuLabel">
                <div [sx]="styles.div2">
                  <span kuiAvatar>
                    <img
                      kuiAvatarImage
                      [attr.src]="user().avatar"
                      [attr.alt]="user().name"
                    />
                    <span kuiAvatarFallback>CN</span>
                  </span>
                  <div [sx]="styles.div3">
                    <span [sx]="styles.span3">{{ user().name }}</span>
                    <span [sx]="styles.span4">{{ user().email }}</span>
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
