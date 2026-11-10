<script setup lang="ts">
import { AlertDialogTitle } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="attrs"
    :sx="[alertDialog.title, sx]"
  >
    <slot />
  </AlertDialogTitle>
</template>
