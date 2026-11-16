<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false, showOnHover = false } = defineProps<{
  asChild?: boolean
  showOnHover?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="button"
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    v-bind="attrs"
    :sx="[sidebar.menuAction, showOnHover && sidebar.menuActionOnHover, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
