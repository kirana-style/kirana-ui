<script setup lang="ts">
import { DialogRoot } from "@ark-ui/vue"
</script>

<template>
  <!-- Ark UI's Dialog, pinned to an edge by its content. Closed, the popup leaves the page, as
       Base UI's does; Ark keeps it while its exit runs. -->
  <DialogRoot lazy-mount unmount-on-exit>
    <slot />
  </DialogRoot>
</template>
