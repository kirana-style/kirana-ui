<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { useSidebar } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    tabindex="-1"
    title="Toggle Sidebar"
    v-bind="attrs"
    :sx="[sidebar.rail, sx]"
    @click="toggleSidebar"
  />
</template>
