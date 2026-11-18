<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="sheet-header" v-bind="attrs" :sx="[sheet.header, sx]">
    <slot />
  </div>
</template>
