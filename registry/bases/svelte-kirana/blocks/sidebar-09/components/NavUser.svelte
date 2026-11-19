<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

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
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { axes } from "../../../../../core/axes"
  import { css } from "@kirana-style/core"
  import { radius, theme } from "../../../../../core/tokens"
  import {
    breakpoint,
    fontSize,
    fontWeight,
    leading,
    lineHeight,
    space,
  } from "../../../../../core/scales"

  let {
    user,
    class: className,
    ...rest
  }: {
    user: {
    name: string
    email: string
    avatar: string
    }
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const overButton = <T extends object>(entries: T) => ({
    ...entries,
    [axes.style.maia]: entries,
    [axes.style.luma]: entries,
    [axes.style.rhea]: {
      ...entries,
      ":has(> svg:first-child)": entries,
      ":has(> svg:last-child)": entries,
    },
    [axes.style.sera]: entries,
  })

  const styles = {
    // `rounded-lg` on the avatar, as upstream's bases draw it; the picture, the fallback and the
    // hairline take the root's corner.
    avatarSquare: css({
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarMenuButton: css({
      height: overButton({ [breakpoint.md]: space[8] }),
      paddingBlock: overButton({ [breakpoint.md]: space["0"] }),
      paddingInlineStart: overButton({ [breakpoint.md]: space["0"] }),
      paddingInlineEnd: overButton({ [breakpoint.md]: space["0"] }),
      backgroundColor: { "[data-open]": theme.sidebarAccent },
      color: { "[data-open]": theme.sidebarAccentForeground },
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

  const ctx = useSidebar()
</script>

<SidebarMenu {...rest} sx={className as Sx}>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <SidebarMenuButton {...props()} class={props().class} style={props().style} size="lg" sx={styles.sidebarMenuButton}>
            <Avatar sx={[styles.navUserAvatar, styles.avatarSquare]}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback sx={styles.avatarFallback}>
                CN
              </AvatarFallback>
            </Avatar>
            <div sx={styles.navUserDiv}>
              <span sx={styles.navUserSpan}>
                {user.name}
              </span>
              <span sx={styles.span2}>
                {user.email}
              </span>
            </div>
            <IconPlaceholder lucide="ChevronsUpDownIcon" tabler="IconSelector" hugeicons="UnfoldMoreIcon" phosphor="CaretUpDownIcon" remixicon="RiArrowUpDownLine" sx={styles.iconPlaceholder} />
          </SidebarMenuButton>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.dropdownMenuContent} side={ctx.isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
        <!-- A label must sit inside a group: Base UI throws on open otherwise. -->
        <DropdownMenuGroup>
          <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
            <div sx={styles.div2}>
              <Avatar sx={[styles.avatar2, styles.avatarSquare]}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback sx={styles.avatarFallback2}>
                  CN
                </AvatarFallback>
              </Avatar>
              <div sx={styles.div3}>
                <span sx={styles.span3}>
                  {user.name}
                </span>
                <span sx={styles.span4}>
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPlaceholder lucide="SparklesIcon" tabler="IconSparkles" hugeicons="SparklesIcon" phosphor="SparkleIcon" remixicon="RiSparklingLine" />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPlaceholder lucide="BadgeCheckIcon" tabler="IconRosetteDiscountCheck" hugeicons="CheckmarkBadgeIcon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleLine" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder lucide="BellIcon" tabler="IconBell" hugeicons="NotificationIcon" phosphor="BellIcon" remixicon="RiNotificationLine" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconPlaceholder lucide="LogOutIcon" tabler="IconLogout" hugeicons="LogoutIcon" phosphor="SignOutIcon" remixicon="RiLogoutBoxLine" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</SidebarMenu>
