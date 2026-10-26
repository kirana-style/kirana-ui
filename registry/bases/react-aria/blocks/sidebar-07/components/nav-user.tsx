"use client"

import { css, props as styleProps } from "@kirana-style/core"

import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { theme } from "../../../../../core/tokens"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
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
  menu: css({ width: "fit-content" }),
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
          <SidebarMenuButton size="lg" sx={styles.trigger}>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div sx={styles.text}>
              <span sx={styles.name}>{user.name}</span>
              <span sx={styles.email}>{user.email}</span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              {...styleProps(styles.chevron)}
            />
          </SidebarMenuButton>
          <DropdownMenu
            sx={styles.menu}
            placement={isMobile ? "bottom end" : "right bottom"}
            offset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.label}>
                <div sx={styles.account}>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div sx={styles.text}>
                    <span sx={styles.name}>{user.name}</span>
                    <span sx={styles.email}>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
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
