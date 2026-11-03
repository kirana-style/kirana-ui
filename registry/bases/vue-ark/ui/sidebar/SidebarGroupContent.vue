<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    v-bind="attrs"
    :sx="[sidebar.groupContent, sx]"
  >
    <slot />
  </div>
</template>
