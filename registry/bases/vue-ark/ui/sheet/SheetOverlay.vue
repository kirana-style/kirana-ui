<script setup lang="ts">
import { DialogBackdrop } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogBackdrop
    data-slot="sheet-overlay"
    v-bind="attrs"
    :sx="[sheet.overlay, sx]"
  />
</template>
