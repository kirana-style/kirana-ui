<script setup lang="ts">
import { TooltipTrigger } from "@ark-ui/vue"
</script>

<template>
  <!-- `type="button"`: Ark's tooltip trigger is a `<button>` without one, which submits the form it
       sits in (LF-021). -->
  <TooltipTrigger type="button" data-slot="tooltip-trigger">
    <slot />
  </TooltipTrigger>
</template>
