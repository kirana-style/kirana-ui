<script setup lang="ts">
import { AlertDialog } from "@kirana-ui/vue/alert-dialog"
</script>

<template>
  <AlertDialog.Trigger data-slot="alert-dialog-trigger">
    <slot />
  </AlertDialog.Trigger>
</template>
