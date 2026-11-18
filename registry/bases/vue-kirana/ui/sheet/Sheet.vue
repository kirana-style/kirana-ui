<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
</script>

<template>
  <!-- Kirana UI's Dialog, pinned to an edge by its content. -->
  <Dialog.Root>
    <slot />
  </Dialog.Root>
</template>
