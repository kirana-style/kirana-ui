<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="sheet-footer" v-bind="attrs" :sx="[sheet.footer, sx]">
    <slot />
  </div>
</template>
