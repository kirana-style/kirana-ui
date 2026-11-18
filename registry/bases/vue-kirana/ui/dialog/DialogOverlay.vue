<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"
import { backdropMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Dialog.Backdrop
    data-slot="dialog-overlay"
    v-bind="attrs"
    :sx="[backdropMotion, dialog.overlay, sx]"
  />
</template>
