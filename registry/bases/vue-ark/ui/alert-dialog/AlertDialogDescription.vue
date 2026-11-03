<script setup lang="ts">
import { DialogDescription } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { alertDialog } from "../../../../styles/alert-dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <DialogDescription as-child>
    <p
      data-slot="alert-dialog-description"
      v-bind="attrs"
      :sx="[alertDialog.description, sx]"
    >
      <slot />
    </p>
  </DialogDescription>
</template>
