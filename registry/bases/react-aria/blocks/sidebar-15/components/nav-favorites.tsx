"use client"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuAction: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navFavoritesSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  dropdownMenu: css({
    width: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  iconPlaceholder: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder2: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder3: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder4: css({
    color: theme.mutedForeground,
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

export function NavFavorites({
  favorites,
}: {
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup sx={styles.sidebarGroup}>
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton href={item.url} tooltip={item.name}>
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </SidebarMenuButton>

            <DropdownMenuTrigger>
              <SidebarMenuAction showOnHover sx={styles.sidebarMenuAction}>
                <IconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                />
                <span sx={styles.navFavoritesSpan}>More</span>
              </SidebarMenuAction>
              <DropdownMenu
                sx={styles.dropdownMenu}
                placement={isMobile ? "bottom end" : "right top"}
              >
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="StarOffIcon"
                    tabler="IconStarOff"
                    hugeicons="StarOffIcon"
                    phosphor="StarIcon"
                    remixicon="RiStarOffLine"
                    {...styleProps(styles.iconPlaceholder)}
                  />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="LinkIcon"
                    tabler="IconLink"
                    hugeicons="LinkIcon"
                    phosphor="LinkIcon"
                    remixicon="RiLinksLine"
                    {...styleProps(styles.iconPlaceholder2)}
                  />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ArrowUpRightIcon"
                    tabler="IconArrowUpRight"
                    hugeicons="ArrowUpRightIcon"
                    phosphor="ArrowUpRightIcon"
                    remixicon="RiArrowRightUpLine"
                    {...styleProps(styles.iconPlaceholder3)}
                  />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="Trash2Icon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                    {...styleProps(styles.iconPlaceholder4)}
                  />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton sx={styles.sidebarMenuButton}>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
