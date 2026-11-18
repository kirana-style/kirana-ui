<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Dialog.Title
    data-slot="dialog-title"
    v-bind="attrs"
    :sx="[dialog.title, sx]"
  >
    <slot />
  </Dialog.Title>
</template>
