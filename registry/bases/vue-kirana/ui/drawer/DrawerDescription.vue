<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <Drawer.Description
    data-slot="drawer-description"
    as="p"
    v-bind="attrs"
    :sx="[drawer.description, sx]"
  >
    <slot />
  </Drawer.Description>
</template>
