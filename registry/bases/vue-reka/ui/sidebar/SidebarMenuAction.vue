<script setup lang="ts">
import { Primitive } from "reka-ui"
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
  <Primitive
    as="button"
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    v-bind="attrs"
    :sx="[sidebar.menuAction, showOnHover && sidebar.menuActionOnHover, sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
