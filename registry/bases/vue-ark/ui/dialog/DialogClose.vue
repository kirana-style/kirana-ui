<script setup lang="ts">
import { DialogCloseTrigger } from "@ark-ui/vue"
</script>

<template>
  <DialogCloseTrigger data-slot="dialog-close">
    <slot />
  </DialogCloseTrigger>
</template>
