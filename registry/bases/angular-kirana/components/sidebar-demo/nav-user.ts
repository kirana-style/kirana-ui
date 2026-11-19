import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const styles = {
  navUserSidebarMenuButton: css({
    backgroundColor: { '[data-state="open"]': theme.sidebarAccent },
    color: { '[data-state="open"]': theme.sidebarAccentForeground },
  }),
  navUserAvatar: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  navUserAvatarFallback: css({
    borderRadius: { "*": null, base: radius.lg },
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
  navUserSpan2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  navUserIconPlaceholder: css({
    marginLeft: "auto",
    width: space[4],
    height: space[4],
  }),
  navUserDropdownMenuContent: css({
    width: { "*": null, base: "var(--radix-dropdown-menu-trigger-width)" },
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  navUserDropdownMenuLabel: css({
    padding: { "*": null, base: space["0"] },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  navUserDiv2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[1],
    paddingBlock: space["1.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  navUserAvatar2: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  navUserAvatarFallback2: css({
    borderRadius: { "*": null, base: radius.lg },
  }),
  navUserDiv3: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  navUserSpan3: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  navUserSpan4: css({
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
            [sx]="styles.navUserSidebarMenuButton"
          >
            <span kuiAvatar [sx]="styles.navUserAvatar">
              <img
                kuiAvatarImage
                [attr.src]="user().avatar"
                [attr.alt]="user().name"
              />
              <span kuiAvatarFallback [sx]="styles.navUserAvatarFallback"
                >CN</span
              >
            </span>
            <div [sx]="styles.navUserDiv">
              <span [sx]="styles.navUserSpan">{{ user().name }}</span>
              <span [sx]="styles.navUserSpan2">{{ user().email }}</span>
            </div>
            <svg
              iconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              [sx]="styles.navUserIconPlaceholder"
            ></svg>
          </button>
          <div
            kuiDropdownMenuContent
            [sx]="styles.navUserDropdownMenuContent"
            [side]="isMobile() ? 'bottom' : 'right'"
            align="end"
            [sideOffset]="4"
          >
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel [sx]="styles.navUserDropdownMenuLabel">
                <div [sx]="styles.navUserDiv2">
                  <span kuiAvatar [sx]="styles.navUserAvatar2">
                    <img
                      kuiAvatarImage
                      [attr.src]="user().avatar"
                      [attr.alt]="user().name"
                    />
                    <span kuiAvatarFallback [sx]="styles.navUserAvatarFallback2"
                      >CN</span
                    >
                  </span>
                  <div [sx]="styles.navUserDiv3">
                    <span [sx]="styles.navUserSpan3">{{ user().name }}</span>
                    <span [sx]="styles.navUserSpan4">{{ user().email }}</span>
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
                  lucide="BadgeCheck"
                  tabler="IconRosetteDiscountCheck"
                  hugeicons="CheckmarkBadge02Icon"
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
            <div kuiDropdownMenuGroup>
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
