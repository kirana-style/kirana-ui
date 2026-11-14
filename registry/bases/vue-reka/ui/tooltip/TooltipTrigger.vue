<script setup lang="ts">
import { TooltipTrigger } from "reka-ui"
</script>

<template>
  <!-- `type="button"`: Reka's tooltip trigger is a `<button>` without one, which submits the form
       it sits in, where its popover and dialog triggers say `type="button"` (LF-022). -->
  <TooltipTrigger type="button" data-slot="tooltip-trigger">
    <slot />
  </TooltipTrigger>
</template>
