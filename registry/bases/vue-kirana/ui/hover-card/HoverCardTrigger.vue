<script setup lang="ts">
import { HoverCard } from "@kirana-ui/vue/hover-card"
</script>

<template>
  <HoverCard.Trigger data-slot="hover-card-trigger">
    <slot />
  </HoverCard.Trigger>
</template>
