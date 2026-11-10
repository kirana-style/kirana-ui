<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { table } from "../../../../styles/table.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <tr data-slot="table-row" v-bind="attrs" :sx="[table.row, sx]">
    <slot />
  </tr>
</template>
