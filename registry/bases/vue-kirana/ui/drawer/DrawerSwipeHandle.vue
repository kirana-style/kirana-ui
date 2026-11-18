<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="drawer-swipe-handle"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[drawer.swipeHandle, sx]"
  />
</template>
