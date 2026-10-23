<script setup lang="ts">
import { DialogTitle } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => dialog.title)
</script>

<template>
  <DialogTitle data-slot="dialog-title" v-bind="bound">
    <slot />
  </DialogTitle>
</template>
