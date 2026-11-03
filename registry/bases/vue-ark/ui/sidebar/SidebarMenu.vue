<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    v-bind="attrs"
    :sx="[sidebar.menu, sx]"
  >
    <slot />
  </ul>
</template>
