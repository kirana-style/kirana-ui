import { For, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavFavorites(props: {
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["favorites", "class", "sx"])
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
    dropdownMenuContent: css({
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

  const ctx = useSidebar()

  return (
    <SidebarGroup
      class={local.class}
      sx={[styles.sidebarGroup, local.sx]}
      {...rest}
    >
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.favorites}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={(childProps) => (
                  <a {...childProps()} href={item.url} title={item.name}>
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </a>
                )}
              />
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(childProps) => (
                    <SidebarMenuAction
                      {...childProps()}
                      showOnHover
                      sx={styles.sidebarMenuAction}
                    >
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                      <span sx={styles.navFavoritesSpan}>More</span>
                    </SidebarMenuAction>
                  )}
                />
                <DropdownMenuContent
                  sx={styles.dropdownMenuContent}
                  side={ctx.isMobile ? "bottom" : "right"}
                  align={ctx.isMobile ? "end" : "start"}
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
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
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
