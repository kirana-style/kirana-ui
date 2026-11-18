<script setup lang="ts">
import { AlertDialog } from "@kirana-ui/vue/alert-dialog"
</script>

<template>
  <!-- Kirana UI's AlertDialog: its role, and no closing from outside, as Base UI's. -->
  <AlertDialog.Root>
    <slot />
  </AlertDialog.Root>
</template>
