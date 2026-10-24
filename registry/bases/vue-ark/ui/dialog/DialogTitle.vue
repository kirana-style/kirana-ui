<script setup lang="ts">
import { DialogTitle } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <DialogTitle data-slot="dialog-title" v-bind="attrs" :sx="[dialog.title, sx]">
    <slot />
  </DialogTitle>
</template>
