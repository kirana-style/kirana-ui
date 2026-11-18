<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Dialog.Description
    data-slot="sheet-description"
    v-bind="attrs"
    :sx="[sheet.description, sx]"
  >
    <slot />
  </Dialog.Description>
</template>
