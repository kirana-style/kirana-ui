<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { Skeleton } from "../skeleton"

defineOptions({ inheritAttrs: false })

const { showIcon = false } = defineProps<{ showIcon?: boolean }>()
const { sx, attrs } = useSx()

// A width between 50 and 90%, so a list of them reads as text.
const width = `${Math.floor(Math.random() * 40) + 50}%`
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    v-bind="attrs"
    :sx="[sidebar.menuSkeleton, sx]"
  >
    <Skeleton
      v-if="showIcon"
      data-sidebar="menu-skeleton-icon"
      :sx="sidebar.menuSkeletonIcon"
    />
    <Skeleton
      data-sidebar="menu-skeleton-text"
      :sx="sidebar.menuSkeletonText"
      :style="{ maxWidth: width }"
    />
  </div>
</template>
