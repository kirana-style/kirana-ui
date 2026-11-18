<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
</script>

<template>
  <!-- What a caller passes (`v-model:open` …) goes to the root. -->
  <Dialog.Root>
    <slot />
  </Dialog.Root>
</template>
