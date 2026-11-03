<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <p data-slot="item-description" v-bind="attrs" :sx="[item.description, sx]">
    <slot />
  </p>
</template>
