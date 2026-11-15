<script setup lang="ts">
import { DrawerBackdrop } from "@ui-sdk/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DrawerBackdrop"
    name="drawer-overlay"
    tag="div"
    v-bind="attrs"
    :sx="[drawer.overlay, sx]"
  >
    <slot />
  </UisdkPart>
</template>
