<script setup lang="ts">
import Sidebar15Icon from "./Sidebar15Icon.vue"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"

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
    badge?: unknown
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <SidebarMenuButton as-child>
            <a :href="item.url">
              <Sidebar15Icon v-if="item.icon" :icon="item.icon" />
              <span>
                {{ item.title }}
              </span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuBadge v-if="item.badge">
            {{ item.badge }}
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
