<script setup lang="ts">
import { DialogTrigger } from "@ark-ui/vue"
</script>

<template>
  <DialogTrigger data-slot="dialog-trigger">
    <slot />
  </DialogTrigger>
</template>
