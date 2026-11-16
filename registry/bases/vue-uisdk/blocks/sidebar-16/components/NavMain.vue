<script setup lang="ts">
import Sidebar16Icon from "./Sidebar16Icon.vue"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
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

const styles = {
  sidebarMenuAction: css({
    rotate: { '[aria-expanded="true"]': "90deg" },
  }),
  navMainSpan: css({
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
}

const { items } = defineProps<{
  items: {
    title: string
    url: string
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel> Platform </SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        :default-open="item.isActive"
        as-child
      >
        <SidebarMenuItem>
          <SidebarMenuButton :tooltip="item.title" as-child>
            <a :href="item.url">
              <Sidebar16Icon v-if="item.icon" :icon="item.icon" />
              <span>
                {{ item.title }}
              </span>
            </a>
          </SidebarMenuButton>
          <template v-if="item.items?.length">
            <SidebarMenuAction :sx="styles.sidebarMenuAction" as-child>
              <CollapsibleTrigger>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
                <span :sx="styles.navMainSpan"> Toggle </span>
              </CollapsibleTrigger>
            </SidebarMenuAction>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton as-child>
                    <a :href="subItem.url">
                      <span>
                        {{ subItem.title }}
                      </span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
