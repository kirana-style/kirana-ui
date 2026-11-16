<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="div"
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    v-bind="attrs"
    :sx="[sidebar.groupLabel, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
