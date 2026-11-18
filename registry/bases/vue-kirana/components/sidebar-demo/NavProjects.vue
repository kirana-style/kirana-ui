<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { space } from "../../../../core/scales"
import { COLLAPSED } from "../../../../styles/sidebar.styles"

const styles = {
  navProjectsSidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  navProjectsSpan: css({
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
  navProjectsDropdownMenuContent: css({
    width: { "*": null, base: space[48] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  navProjectsIconPlaceholder: css({
    color: theme.mutedForeground,
  }),
  navProjectsIconPlaceholder2: css({
    color: theme.mutedForeground,
  }),
  navProjectsIconPlaceholder3: css({
    color: theme.mutedForeground,
  }),
  navProjectsSidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
  navProjectsIconPlaceholder4: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
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
  <SidebarGroup :sx="styles.navProjectsSidebarGroup">
    <SidebarGroupLabel> Projects </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <IconPlaceholder v-if="item.icon" v-bind="item.icon" />
            <span>
              {{ item.name }}
            </span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
              <span :sx="styles.navProjectsSpan"> More </span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            :sx="styles.navProjectsDropdownMenuContent"
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
                :sx="styles.navProjectsIconPlaceholder"
              />
              <span> View Project </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="ForwardIcon"
                tabler="IconCornerUpRight"
                hugeicons="RedoIcon"
                phosphor="ArrowBendUpRightIcon"
                remixicon="RiCornerUpRightLine"
                :sx="styles.navProjectsIconPlaceholder2"
              />
              <span> Share Project </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="Trash2Icon"
                tabler="IconTrash"
                hugeicons="Delete02Icon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
                :sx="styles.navProjectsIconPlaceholder3"
              />
              <span> Delete Project </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton :sx="styles.navProjectsSidebarMenuButton">
          <IconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeOutlineIcon"
            remixicon="RiMoreLine"
            :sx="styles.navProjectsIconPlaceholder4"
          />
          <span> More </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
