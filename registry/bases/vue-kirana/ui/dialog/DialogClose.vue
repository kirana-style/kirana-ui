<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
</script>

<template>
  <Dialog.Close data-slot="dialog-close">
    <slot />
  </Dialog.Close>
</template>
