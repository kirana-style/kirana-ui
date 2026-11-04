<script setup lang="ts">
import Sidebar07Icon from "./Sidebar07Icon.vue"
import { css } from "@kirana-style/core"
import { alpha, theme } from "../../../../../core/tokens"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { visuallyHidden } from "../../../../../styles/visually-hidden.styles"
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

const styles = {
  // Hidden while the sidebar is collapsed to its icons.
  group: css({ display: { [COLLAPSED]: "none" } }),
  action: css({ backgroundColor: { '[aria-expanded="true"]': theme.muted } }),
  // `w-fit`, as upstream's bases write it.
  menu: css({ width: { "*": null, base: "fit-content" } }),
  quiet: css({ color: alpha.sidebarForeground70 }),
}

const { projects } = defineProps<{
  projects: {
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
  <SidebarGroup :sx="styles.group">
    <SidebarGroupLabel> Projects </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <Sidebar07Icon v-if="item.icon" :icon="item.icon" />
            <span>
              {{ item.name }}
            </span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover :sx="styles.action">
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
              <span :sx="visuallyHidden"> More </span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            :sx="styles.menu"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              />
              <span> View Project </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowForward"
                hugeicons="ArrowRightIcon"
                phosphor="ShareFatIcon"
                remixicon="RiShareForwardLine"
              />
              <span> Share Project </span>
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
              <span> Delete Project </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton :sx="styles.quiet">
          <IconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeOutlineIcon"
            remixicon="RiMoreLine"
            :sx="styles.quiet"
          />
          <span> More </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
