<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
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
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"

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

const { user } = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()
const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg" :sx="styles.navUserSidebarMenuButton">
            <Avatar :sx="styles.navUserAvatar">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback :sx="styles.navUserAvatarFallback">
                CN
              </AvatarFallback>
            </Avatar>
            <div :sx="styles.navUserDiv">
              <span :sx="styles.navUserSpan">
                {{ user.name }}
              </span>
              <span :sx="styles.navUserSpan2">
                {{ user.email }}
              </span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              :sx="styles.navUserIconPlaceholder"
            />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          :sx="styles.navUserDropdownMenuContent"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel :sx="styles.navUserDropdownMenuLabel">
              <div :sx="styles.navUserDiv2">
                <Avatar :sx="styles.navUserAvatar2">
                  <AvatarImage :src="user.avatar" :alt="user.name" />
                  <AvatarFallback :sx="styles.navUserAvatarFallback2">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div :sx="styles.navUserDiv3">
                  <span :sx="styles.navUserSpan3">
                    {{ user.name }}
                  </span>
                  <span :sx="styles.navUserSpan4">
                    {{ user.email }}
                  </span>
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
              />Upgrade to Pro
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
              />Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              />Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
                phosphor="BellIcon"
                remixicon="RiNotificationLine"
              />Notifications
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
              />Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
