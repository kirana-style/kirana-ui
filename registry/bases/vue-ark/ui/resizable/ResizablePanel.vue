<script setup lang="ts">
import { SplitterPanel } from "@ark-ui/vue"

// Ark's required `id`, one of the group's `panels`, declared here and passed on.
const { id } = defineProps<{ id: string }>()
</script>

<template>
  <SplitterPanel data-slot="resizable-panel" :id="id">
    <slot />
  </SplitterPanel>
</template>
