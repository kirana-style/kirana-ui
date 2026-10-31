"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  // `rounded-lg` on the avatar, as shadcn/ui's blocks page draws it (its `new-york-v4` copy): the
  // picture, the fallback and the hairline take it too, which round themselves otherwise.
  avatarSquare: css({
    borderRadius: { "*": null, base: radius.lg },
    "::after": { borderRadius: radius.lg },
  }),
  avatarSquarePart: css({ borderRadius: { "*": null, base: radius.lg } }),
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.sidebarAccent },
    color: { '[aria-expanded="true"]': theme.sidebarAccentForeground },
    height: { [breakpoint.md]: space[8] },
    padding: { [breakpoint.md]: space["0"] },
  }),
  navUserAvatar: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  avatarFallback: css({
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
  dropdownMenu: css({
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
  avatar2: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  avatarFallback2: css({
    borderRadius: { "*": null, base: radius.lg },
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

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger>
          <SidebarMenuButton size="lg" sx={styles.sidebarMenuButton}>
            <Avatar sx={[styles.navUserAvatar, styles.avatarSquare]}>
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                sx={styles.avatarSquarePart}
              />
              <AvatarFallback
                sx={[styles.avatarFallback, styles.avatarSquarePart]}
              >
                CN
              </AvatarFallback>
            </Avatar>
            <div sx={styles.navUserDiv}>
              <span sx={styles.navUserSpan}>{user.name}</span>
              <span sx={styles.span2}>{user.email}</span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </SidebarMenuButton>
          <DropdownMenu
            sx={styles.dropdownMenu}
            placement={isMobile ? "bottom end" : "right bottom"}
            offset={4}
          >
            <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
              <div sx={styles.div2}>
                <Avatar sx={[styles.avatar2, styles.avatarSquare]}>
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    sx={styles.avatarSquarePart}
                  />
                  <AvatarFallback
                    sx={[styles.avatarFallback2, styles.avatarSquarePart]}
                  >
                    CN
                  </AvatarFallback>
                </Avatar>
                <div sx={styles.div3}>
                  <span sx={styles.span3}>{user.name}</span>
                  <span sx={styles.span4}>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="SparklesIcon"
                  tabler="IconSparkles"
                  hugeicons="SparklesIcon"
                  phosphor="SparkleIcon"
                  remixicon="RiSparklingLine"
                />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
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
              Log out
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
