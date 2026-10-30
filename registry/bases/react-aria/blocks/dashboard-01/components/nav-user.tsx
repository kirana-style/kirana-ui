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
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navUserAvatar: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    borderRadius: { "*": null, base: radius.lg },
    filter: { "*": null, base: "grayscale(100%)" },
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
    color: `color-mix(in oklab, ${theme.foreground} 70%, transparent)`,
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
    width: space[4],
    height: space[4],
  }),
  dropdownMenu: css({
    minWidth: { "*": null, base: space[56] },
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
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
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
    color: theme.mutedForeground,
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
            <Avatar sx={styles.navUserAvatar}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback sx={styles.avatarFallback}>CN</AvatarFallback>
            </Avatar>
            <div sx={styles.navUserDiv}>
              <span sx={styles.navUserSpan}>{user.name}</span>
              <span sx={styles.span2}>{user.email}</span>
            </div>
            <IconPlaceholder
              lucide="EllipsisVerticalIcon"
              tabler="IconDotsVertical"
              hugeicons="MoreVerticalCircle01Icon"
              phosphor="DotsThreeVerticalIcon"
              remixicon="RiMore2Line"
              {...styleProps(styles.iconPlaceholder)}
            />
          </SidebarMenuButton>
          <DropdownMenu
            sx={styles.dropdownMenu}
            placement={isMobile ? "bottom end" : "right bottom"}
            offset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                <div sx={styles.div2}>
                  <Avatar sx={styles.avatar2}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback sx={styles.avatarFallback2}>
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.div3}>
                    <span sx={styles.span3}>{user.name}</span>
                    <span sx={styles.span4}>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CircleUserRoundIcon"
                  tabler="IconUserCircle"
                  hugeicons="UserCircle02Icon"
                  phosphor="UserCircleIcon"
                  remixicon="RiUserLine"
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
                  tabler="IconNotification"
                  hugeicons="Notification03Icon"
                  phosphor="BellIcon"
                  remixicon="RiNotification3Line"
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="Logout01Icon"
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
