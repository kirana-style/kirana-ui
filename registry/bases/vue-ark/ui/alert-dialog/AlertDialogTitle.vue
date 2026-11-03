<script setup lang="ts">
import { DialogTitle } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogTitle
    data-slot="alert-dialog-title"
    v-bind="attrs"
    :sx="[alertDialog.title, sx]"
  >
    <slot />
  </DialogTitle>
</template>
