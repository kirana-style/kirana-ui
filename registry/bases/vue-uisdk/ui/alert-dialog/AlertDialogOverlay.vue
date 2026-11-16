<script setup lang="ts">
import { AlertDialogBackdrop } from "@ui-sdk/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { backdropMotion } from "../../../../styles/overlay.styles"
import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AlertDialogBackdrop"
    slot-name="alert-dialog-overlay"
    tag="div"
    v-bind="attrs"
    :sx="[backdropMotion, alertDialog.overlay, sx]"
  >
    <slot />
  </UisdkPart>
</template>
