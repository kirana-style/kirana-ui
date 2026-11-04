<script setup lang="ts">
import Dashboard01Icon from "./Dashboard01Icon.vue"
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
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuAction: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navDocumentsSpan: css({
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
    width: { "*": null, base: space[24] },
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
  iconPlaceholder: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

const { items } = defineProps<{
  items: {
    name: string
    url: string
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
  }[]
}>()
const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup :sx="styles.sidebarGroup">
    <SidebarGroupLabel> Documents </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <Dashboard01Icon v-if="item.icon" :icon="item.icon" />
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
              <span :sx="styles.navDocumentsSpan"> More </span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            :sx="styles.dropdownMenuContent"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="Folder01Icon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              />
              <span> Open </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare3"
                hugeicons="Share01Icon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              />
              <span> Share </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder
                lucide="Trash2Icon"
                tabler="IconTrash"
                hugeicons="Delete02Icon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              <span> Delete </span>
            </DropdownMenuItem>
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
            :sx="styles.iconPlaceholder"
          />
          <span> More </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
