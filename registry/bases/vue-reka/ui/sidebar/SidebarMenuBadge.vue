<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    v-bind="attrs"
    :sx="[sidebar.menuBadge, sx]"
  >
    <slot />
  </div>
</template>
