<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="drawer-header" v-bind="attrs" :sx="[drawer.header, sx]">
    <slot />
  </div>
</template>
