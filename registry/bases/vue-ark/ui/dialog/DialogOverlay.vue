<script setup lang="ts">
import { DialogBackdrop } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"
import { backdropMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => [backdropMotion, dialog.overlay])
</script>

<template>
  <DialogBackdrop data-slot="dialog-overlay" v-bind="bound" />
</template>
