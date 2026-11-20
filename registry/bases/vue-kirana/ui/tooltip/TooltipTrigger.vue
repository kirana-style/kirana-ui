<script setup lang="ts">
import { Tooltip } from "@kirana-ui/vue/tooltip"
</script>

<template>
  <Tooltip.Trigger data-slot="tooltip-trigger">
    <slot />
  </Tooltip.Trigger>
</template>
