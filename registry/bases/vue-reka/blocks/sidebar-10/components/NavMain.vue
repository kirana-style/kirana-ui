<script setup lang="ts">
import Sidebar10Icon from "./Sidebar10Icon.vue"
import {
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
    isActive?: boolean
  }[]
}>()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in items" :key="item.title">
      <SidebarMenuButton :is-active="item.isActive" as-child>
        <a :href="item.url">
          <Sidebar10Icon v-if="item.icon" :icon="item.icon" />
          <span>
            {{ item.title }}
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
