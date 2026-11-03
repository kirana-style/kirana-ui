<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="alert-dialog-header"
    v-bind="attrs"
    :sx="[alertDialog.header, sx]"
  >
    <slot />
  </div>
</template>
