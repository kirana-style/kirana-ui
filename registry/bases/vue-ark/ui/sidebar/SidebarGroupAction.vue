<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.button
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    v-bind="attrs"
    :sx="[sidebar.groupAction, sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.button>
</template>
