<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const {
  asChild = false,
  size = "md",
  isActive = false,
} = defineProps<{
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="a"
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :data-size="size"
    :data-active="isActive ? '' : undefined"
    v-bind="attrs"
    :sx="[sidebar.menuSubButton, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
