<script setup lang="ts">
import { AlertDialog } from "@kirana-ui/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AlertDialog.Description
    data-slot="alert-dialog-description"
    v-bind="attrs"
    :sx="[alertDialog.description, sx]"
  >
    <slot />
  </AlertDialog.Description>
</template>
