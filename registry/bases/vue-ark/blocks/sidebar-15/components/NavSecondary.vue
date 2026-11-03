<script setup lang="ts">
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
    icon: unknown
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
              {{ item.icon }}
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
