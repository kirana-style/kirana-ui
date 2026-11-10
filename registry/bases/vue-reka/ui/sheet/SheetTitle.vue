<script setup lang="ts">
import { DialogTitle } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogTitle data-slot="sheet-title" v-bind="attrs" :sx="[sheet.title, sx]">
    <slot />
  </DialogTitle>
</template>
