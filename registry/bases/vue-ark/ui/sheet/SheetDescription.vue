<script setup lang="ts">
import { DialogDescription } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <DialogDescription as-child>
    <p
      data-slot="sheet-description"
      v-bind="attrs"
      :sx="[sheet.description, sx]"
    >
      <slot />
    </p>
  </DialogDescription>
</template>
