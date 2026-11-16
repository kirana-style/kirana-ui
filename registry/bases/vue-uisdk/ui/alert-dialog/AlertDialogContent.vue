<script setup lang="ts">
import { AlertDialogContent } from "@ui-sdk/vue/alert-dialog"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { modalMotion } from "../../../../styles/overlay.styles"
import { alertDialog } from "../../../../styles/alert-dialog.styles"
import { CONTENT } from "./context"
import AlertDialogOverlay from "./AlertDialogOverlay.vue"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "default" | "sm" }>()
const content = inject(CONTENT, undefined)
const { sx, attrs } = useSx()
</script>

<template>
  <AlertDialogOverlay />
  <UisdkPart
    :part="AlertDialogContent"
    name="alert-dialog-content"
    tag="div"
    :data-size="size"
    :element="
      (el: Element | null) => content && (content.el = el as HTMLElement | null)
    "
    v-bind="attrs"
    :sx="[modalMotion, alertDialog.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
