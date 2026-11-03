<script setup lang="ts">
import { DrawerBackdrop } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DrawerBackdrop
    data-slot="drawer-overlay"
    v-bind="attrs"
    :sx="[drawer.overlay, sx]"
  />
</template>
