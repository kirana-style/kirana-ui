<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { table } from "../../../../styles/table.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="table-container" :sx="table.container">
    <table data-slot="table" v-bind="attrs" :sx="[table.root, sx]">
      <slot />
    </table>
  </div>
</template>
