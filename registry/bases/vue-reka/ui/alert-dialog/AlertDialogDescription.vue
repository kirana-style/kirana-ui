<script setup lang="ts">
import { AlertDialogDescription } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description (Reka's default element). -->
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="attrs"
    :sx="[alertDialog.description, sx]"
  >
    <slot />
  </AlertDialogDescription>
</template>
