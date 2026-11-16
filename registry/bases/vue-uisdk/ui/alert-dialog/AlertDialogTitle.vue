<script setup lang="ts">
import { AlertDialogTitle } from "@ui-sdk/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AlertDialogTitle"
    name="alert-dialog-title"
    tag="h2"
    v-bind="attrs"
    :sx="[alertDialog.title, sx]"
  >
    <slot />
  </UisdkPart>
</template>
