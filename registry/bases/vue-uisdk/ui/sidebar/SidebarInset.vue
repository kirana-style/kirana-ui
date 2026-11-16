<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <main data-slot="sidebar-inset" v-bind="attrs" :sx="[sidebar.inset, sx]">
    <slot />
  </main>
</template>
