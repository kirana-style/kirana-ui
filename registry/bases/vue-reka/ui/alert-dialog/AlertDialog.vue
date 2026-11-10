<script setup lang="ts">
import { AlertDialogRoot } from "reka-ui"
</script>

<template>
  <!-- Reka UI's AlertDialog: its role, and no closing from outside, as Base UI's AlertDialog.
       Closed, the popup leaves the page, as Base UI's does. -->
  <AlertDialogRoot>
    <slot />
  </AlertDialogRoot>
</template>
