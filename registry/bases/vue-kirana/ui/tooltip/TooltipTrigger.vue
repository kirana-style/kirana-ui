<script setup lang="ts">
import { Tooltip } from "@kirana-ui/vue/tooltip"
</script>

<template>
  <!-- `type="button"`: Kirana UI's tooltip trigger is a `<button>` without one, which submits the
       form it sits in, where its popover trigger says `type="button"` (PF-029). -->
  <Tooltip.Trigger type="button" data-slot="tooltip-trigger">
    <slot />
  </Tooltip.Trigger>
</template>
