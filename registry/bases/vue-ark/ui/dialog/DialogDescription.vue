<script setup lang="ts">
import { DialogDescription } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <DialogDescription as-child>
    <p
      data-slot="dialog-description"
      v-bind="attrs"
      :sx="[dialog.description, sx]"
    >
      <slot />
    </p>
  </DialogDescription>
</template>
