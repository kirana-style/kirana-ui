<script setup lang="ts">
import { DrawerDescription } from "@ui-sdk/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DrawerDescription"
    name="drawer-description"
    tag="p"
    v-bind="attrs"
    :sx="[drawer.description, sx]"
  >
    <slot />
  </UisdkPart>
</template>
