<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { pagination } from "../../../../styles/pagination.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ul
    data-slot="pagination-content"
    v-bind="attrs"
    :sx="[pagination.content, sx]"
  >
    <slot />
  </ul>
</template>
