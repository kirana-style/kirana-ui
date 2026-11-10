<script setup lang="ts">
import { Primitive } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Primitive
    as="div"
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    v-bind="attrs"
    :sx="[sidebar.groupLabel, sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
