<script setup lang="ts">
import { DrawerOverlay } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="attrs"
    :sx="[drawer.overlay, sx]"
  />
</template>
