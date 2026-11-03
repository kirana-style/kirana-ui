<script setup lang="ts">
import { DialogBackdrop } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"
import { backdropMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogBackdrop
    data-slot="alert-dialog-overlay"
    v-bind="attrs"
    :sx="[backdropMotion, alertDialog.overlay, sx]"
  />
</template>
