<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { table } from "../../../../styles/table.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <tfoot data-slot="table-footer" v-bind="attrs" :sx="[table.footer, sx]">
    <slot />
  </tfoot>
</template>
