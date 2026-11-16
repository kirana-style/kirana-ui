<script setup lang="ts">
import { DrawerTitle } from "@ui-sdk/vue/drawer"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DrawerTitle"
    slot-name="drawer-title"
    tag="h2"
    v-bind="attrs"
    :sx="[drawer.title, sx]"
  >
    <slot />
  </UisdkPart>
</template>
