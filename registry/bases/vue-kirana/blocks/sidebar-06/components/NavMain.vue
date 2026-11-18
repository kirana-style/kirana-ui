<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
  }),
  dropdownMenuContent: css({
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
}

const { items } = defineProps<{
  items: {
    title: string
    url: string
    icon?: unknown
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <DropdownMenu v-for="item in items" :key="item.title">
        <SidebarMenuItem>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton :sx="styles.sidebarMenuButton">
              {{ item.title }}{{ " " }}
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
                :sx="styles.iconPlaceholder"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            v-if="item.items?.length"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
            :sx="styles.dropdownMenuContent"
          >
            <DropdownMenuItem
              v-for="subItem in item.items"
              :key="subItem.title"
              as-child
            >
              <a :href="subItem.url">
                {{ subItem.title }}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </SidebarMenuItem>
      </DropdownMenu>
    </SidebarMenu>
  </SidebarGroup>
</template>
