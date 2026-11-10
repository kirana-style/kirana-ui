<script setup lang="ts">
import { ToastPortal, ToastViewport, useToastManager } from "reka-ui"
import type { Sx } from "@kirana-style/core"

import { toast as styles } from "../../../../styles/toast.styles"
import ToastItem from "./ToastItem.vue"

const { sx } = defineProps<{ sx?: Sx }>()
// The provider's toasts, newest first: the front one is the first.
const { toasts } = useToastManager()
</script>

<template>
  <ToastPortal>
    <!-- A `div`, as Base UI's viewport, its front toast's height under Base UI's name. -->
    <ToastViewport
      as="div"
      data-slot="toast-viewport"
      :style="{
        '--toast-frontmost-height': 'var(--reka-toast-frontmost-height)',
      }"
      :sx="[styles.viewport, sx]"
    >
      <ToastItem
        v-for="(item, index) in toasts"
        :key="item.id"
        :item="item"
        :index="index"
      />
    </ToastViewport>
  </ToastPortal>
</template>
