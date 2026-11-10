<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="item-footer" v-bind="attrs" :sx="[item.footer, sx]">
    <slot />
  </div>
</template>
