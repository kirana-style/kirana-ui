<script setup lang="ts">
import Sidebar07Icon from "./Sidebar07Icon.vue"
import { css } from "@kirana-style/core"
import { duration, easing } from "../../../../../core/scales"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import {
  collapsibleScope,
  OPEN,
} from "../../../../../styles/collapsible.styles"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"

const styles = {
  // A section of the menu, read by its chevron (`group/collapsible`).
  section: css(collapsibleScope.anchor),
  // Turns to point down while its section is open.
  chevron: css({
    marginInlineStart: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.base]: "90deg" },
  }),
}

const { items } = defineProps<{
  items: {
    title: string
    url: string
    icon?: {
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
        :sx="styles.section"
        as-child
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <Sidebar07Icon v-if="item.icon" :icon="item.icon" />
              <span>
                {{ item.title }}
              </span>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                :sx="styles.chevron"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
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
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
