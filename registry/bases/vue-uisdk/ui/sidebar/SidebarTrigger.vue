<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import { useSidebar } from "./context"

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon-sm"
    @click="toggleSidebar"
  >
    <IconPlaceholder
      lucide="PanelLeftIcon"
      tabler="IconLayoutSidebar"
      hugeicons="SidebarLeftIcon"
      phosphor="SidebarIcon"
      remixicon="RiSideBarLine"
    />
    <span :sx="visuallyHidden">Toggle Sidebar</span>
  </Button>
</template>
