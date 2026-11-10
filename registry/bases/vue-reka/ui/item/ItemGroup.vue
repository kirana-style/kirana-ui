<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="item-group" role="list" v-bind="attrs" :sx="[item.group, sx]">
    <slot />
  </div>
</template>
