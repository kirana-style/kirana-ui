<script setup lang="ts">
import { DialogDescription } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => dialog.description)
</script>

<template>
  <DialogDescription data-slot="dialog-description" v-bind="bound">
    <slot />
  </DialogDescription>
</template>
