<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { pagination } from "../../../../styles/pagination.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    v-bind="attrs"
    :sx="[pagination.root, sx]"
  >
    <slot />
  </nav>
</template>
