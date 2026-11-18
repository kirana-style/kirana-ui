<script setup lang="ts">
import { AlertDialog } from "@kirana-ui/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"
import { modalMotion } from "../../../../styles/overlay.styles"
import AlertDialogOverlay from "./AlertDialogOverlay.vue"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "default" | "sm" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <AlertDialog.Portal>
    <AlertDialogOverlay />
    <AlertDialog.Popup
      data-slot="alert-dialog-content"
      :data-size="size"
      v-bind="attrs"
      :sx="[modalMotion, alertDialog.content, sx]"
    >
      <slot />
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</template>
