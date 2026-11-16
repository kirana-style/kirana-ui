<script setup lang="ts">
import { AlertDialogDescription } from "@ui-sdk/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AlertDialogDescription"
    slot-name="alert-dialog-description"
    tag="p"
    v-bind="attrs"
    :sx="[alertDialog.description, sx]"
  >
    <slot />
  </UisdkPart>
</template>
