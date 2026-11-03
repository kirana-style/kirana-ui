<script setup lang="ts">
import { DrawerTitle } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DrawerTitle data-slot="drawer-title" v-bind="attrs" :sx="[drawer.title, sx]">
    <slot />
  </DrawerTitle>
</template>
