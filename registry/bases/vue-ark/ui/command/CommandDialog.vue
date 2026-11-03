<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog"

defineOptions({ inheritAttrs: false })

const {
  title = "Command Palette",
  description = "Search for a command to run...",
  showCloseButton = false,
} = defineProps<{
  title?: string
  description?: string
  showCloseButton?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Dialog v-bind="attrs">
    <DialogHeader :sx="visuallyHidden">
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </DialogHeader>
    <DialogContent
      :sx="[command.dialog, sx]"
      :show-close-button="showCloseButton"
    >
      <slot />
    </DialogContent>
  </Dialog>
</template>
