<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
</script>

<template>
  <Dialog.Trigger data-slot="sheet-trigger">
    <slot />
  </Dialog.Trigger>
</template>
