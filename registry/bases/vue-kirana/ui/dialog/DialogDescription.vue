<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Dialog.Description
    data-slot="dialog-description"
    v-bind="attrs"
    :sx="[dialog.description, sx]"
  >
    <slot />
  </Dialog.Description>
</template>
