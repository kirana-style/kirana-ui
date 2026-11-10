<script setup lang="ts">
import Sidebar16Icon from "./Sidebar16Icon.vue"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
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
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <SidebarMenuButton size="sm" as-child>
            <a :href="item.url">
              <Sidebar16Icon v-if="item.icon" :icon="item.icon" />
              <span>
                {{ item.title }}
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
