<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
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

const { favorites } = defineProps<{
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
}>()
const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup :sx="styles.sidebarGroup">
    <SidebarGroupLabel> Favorites </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in favorites" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.url" :title="item.name">
            <span>
              {{ item.emoji }}
            </span>
            <span>
              {{ item.name }}
            </span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover :sx="styles.sidebarMenuAction">
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
              <span :sx="styles.navFavoritesSpan"> More </span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            :sx="styles.dropdownMenuContent"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="StarOffIcon"
                  tabler="IconStarOff"
                  hugeicons="StarOffIcon"
                  phosphor="StarIcon"
                  remixicon="RiStarOffLine"
                  :sx="styles.iconPlaceholder"
                />
                <span> Remove from Favorites </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="LinkIcon"
                  tabler="IconLink"
                  hugeicons="LinkIcon"
                  phosphor="LinkIcon"
                  remixicon="RiLinksLine"
                  :sx="styles.iconPlaceholder2"
                />
                <span> Copy Link </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ArrowUpRightIcon"
                  tabler="IconArrowUpRight"
                  hugeicons="ArrowUpRightIcon"
                  phosphor="ArrowUpRightIcon"
                  remixicon="RiArrowRightUpLine"
                  :sx="styles.iconPlaceholder3"
                />
                <span> Open in New Tab </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="Trash2Icon"
                  tabler="IconTrash"
                  hugeicons="Delete02Icon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                  :sx="styles.iconPlaceholder4"
                />
                <span> Delete </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton :sx="styles.sidebarMenuButton">
          <IconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeOutlineIcon"
            remixicon="RiMoreLine"
          />
          <span> More </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
