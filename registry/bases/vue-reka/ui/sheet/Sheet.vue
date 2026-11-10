<script setup lang="ts">
import { DialogRoot } from "reka-ui"
</script>

<template>
  <!-- Reka UI's Dialog, pinned to an edge by its content. Closed, the popup leaves the page, as
       Base UI's does; Reka keeps it while its exit runs. -->
  <DialogRoot>
    <slot />
  </DialogRoot>
</template>
