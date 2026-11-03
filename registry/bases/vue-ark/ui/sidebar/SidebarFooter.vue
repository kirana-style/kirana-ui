<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    v-bind="attrs"
    :sx="[sidebar.footer, sx]"
  >
    <slot />
  </div>
</template>
