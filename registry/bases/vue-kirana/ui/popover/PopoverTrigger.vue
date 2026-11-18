<script setup lang="ts">
import { Popover } from "@kirana-ui/vue/popover"
</script>

<template>
  <Popover.Trigger data-slot="popover-trigger">
    <slot />
  </Popover.Trigger>
</template>
