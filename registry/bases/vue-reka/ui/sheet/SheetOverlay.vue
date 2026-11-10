<script setup lang="ts">
import { DialogOverlay } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogOverlay
    data-slot="sheet-overlay"
    v-bind="attrs"
    :sx="[sheet.overlay, sx]"
  />
</template>
