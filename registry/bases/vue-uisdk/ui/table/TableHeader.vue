<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { table } from "../../../../styles/table.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <thead data-slot="table-header" v-bind="attrs" :sx="[table.header, sx]">
    <slot />
  </thead>
</template>
