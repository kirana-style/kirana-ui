<script setup lang="ts">
import { AlertDialog } from "@kirana-ui/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AlertDialog.Title
    data-slot="alert-dialog-title"
    v-bind="attrs"
    :sx="[alertDialog.title, sx]"
  >
    <slot />
  </AlertDialog.Title>
</template>
