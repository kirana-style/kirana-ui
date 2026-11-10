<script setup lang="ts">
import { DialogDescription } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description (Reka's default element). -->
  <DialogDescription
    data-slot="dialog-description"
    v-bind="attrs"
    :sx="[dialog.description, sx]"
  >
    <slot />
  </DialogDescription>
</template>
