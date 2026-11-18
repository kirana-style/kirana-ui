<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Drawer.Title
    data-slot="drawer-title"
    v-bind="attrs"
    :sx="[drawer.title, sx]"
  >
    <slot />
  </Drawer.Title>
</template>
