<script setup lang="ts">
import { DialogRoot } from "reka-ui"
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs.
       What a caller passes (`v-model:open` …) goes to Reka's root. -->
  <DialogRoot>
    <slot />
  </DialogRoot>
</template>
