<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="drawer-footer" v-bind="attrs" :sx="[drawer.footer, sx]">
    <slot />
  </div>
</template>
