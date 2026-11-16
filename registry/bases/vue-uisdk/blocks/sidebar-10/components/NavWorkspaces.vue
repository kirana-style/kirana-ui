<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarMenuAction: css({
    left: space[2],
    backgroundColor: theme.sidebarAccent,
    color: theme.sidebarAccentForeground,
    rotate: { "[data-open]": "90deg" },
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

const { workspaces } = defineProps<{
  workspaces: {
    name: string
    emoji: unknown
    pages: {
      name: string
      emoji: unknown
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel> Workspaces </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <Collapsible v-for="workspace in workspaces" :key="workspace.name">
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <a href="#">
                <span>
                  {{ workspace.emoji }}
                </span>
                <span>
                  {{ workspace.name }}
                </span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuAction
              :sx="styles.sidebarMenuAction"
              show-on-hover
              as-child
            >
              <CollapsibleTrigger>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
              </CollapsibleTrigger>
            </SidebarMenuAction>
            <SidebarMenuAction show-on-hover>
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </SidebarMenuAction>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="page in workspace.pages"
                  :key="page.name"
                >
                  <SidebarMenuSubButton as-child>
                    <a href="#">
                      <span>
                        {{ page.emoji }}
                      </span>
                      <span>
                        {{ page.name }}
                      </span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
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
    </SidebarGroupContent>
  </SidebarGroup>
</template>
