<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Drawer.Backdrop
    data-slot="drawer-overlay"
    v-bind="attrs"
    :sx="[drawer.overlay, sx]"
  />
</template>
