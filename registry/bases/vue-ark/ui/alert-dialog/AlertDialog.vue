<script setup lang="ts">
import { DialogRoot } from "@ark-ui/vue"
</script>

<template>
  <!-- Ark UI's Dialog as an alert: its role, and no closing from outside, as Base UI's AlertDialog.
       Closed, the popup leaves the page, as Base UI's does. -->
  <DialogRoot
    role="alertdialog"
    :close-on-interact-outside="false"
    lazy-mount
    unmount-on-exit
  >
    <slot />
  </DialogRoot>
</template>
