import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar"
import { radius, theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavUser(props: {
  user: {
    name: string
    email: string
    avatar: string
  }
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["user", "class", "sx"])
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

  const ctx = useSidebar()

  return (
    <SidebarMenu {...rest} class={local.class} sx={[local.sx]}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(childProps) => (
              <SidebarMenuButton
                {...childProps()}
                size="lg"
                sx={styles.navUserSidebarMenuButton}
              >
                <Avatar sx={styles.navUserAvatar}>
                  <AvatarImage src={local.user.avatar} alt={local.user.name} />
                  <AvatarFallback sx={styles.navUserAvatarFallback}>
                    CN
                  </AvatarFallback>
                </Avatar>
                <div sx={styles.navUserDiv}>
                  <span sx={styles.navUserSpan}>{local.user.name}</span>
                  <span sx={styles.navUserSpan2}>{local.user.email}</span>
                </div>
                <IconPlaceholder
                  lucide="ChevronsUpDownIcon"
                  tabler="IconSelector"
                  hugeicons="UnfoldMoreIcon"
                  phosphor="CaretUpDownIcon"
                  remixicon="RiArrowUpDownLine"
                  {...styleProps(styles.navUserIconPlaceholder)}
                />
              </SidebarMenuButton>
            )}
          />
          <DropdownMenuContent
            sx={styles.navUserDropdownMenuContent}
            side={ctx.isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.navUserDropdownMenuLabel}>
                <div sx={styles.navUserDiv2}>
                  <Avatar sx={styles.navUserAvatar2}>
                    <AvatarImage
                      src={local.user.avatar}
                      alt={local.user.name}
                    />
                    <AvatarFallback sx={styles.navUserAvatarFallback2}>
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.navUserDiv3}>
                    <span sx={styles.navUserSpan3}>{local.user.name}</span>
                    <span sx={styles.navUserSpan4}>{local.user.email}</span>
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
                />{" "}
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="BadgeCheck"
                  tabler="IconRosetteDiscountCheck"
                  hugeicons="CheckmarkBadge02Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleLine"
                />{" "}
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                />{" "}
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="BellIcon"
                  tabler="IconBell"
                  hugeicons="NotificationIcon"
                  phosphor="BellIcon"
                  remixicon="RiNotificationLine"
                />{" "}
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="LogOutIcon"
                  tabler="IconLogout"
                  hugeicons="LogoutIcon"
                  phosphor="SignOutIcon"
                  remixicon="RiLogoutBoxLine"
                />{" "}
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
