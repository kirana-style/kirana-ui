<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { table } from "../../../../styles/table.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <caption data-slot="table-caption" v-bind="attrs" :sx="[table.caption, sx]">
    <slot />
  </caption>
</template>
