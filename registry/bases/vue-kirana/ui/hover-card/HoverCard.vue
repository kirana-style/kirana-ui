<script setup lang="ts">
import { HoverCard } from "@kirana-ui/vue/hover-card"

defineOptions({ inheritAttrs: false })

/** Vue's Ark UI parts' `open-delay` and `close-delay`, the root's `delay` and `close-delay`. */
const { openDelay, closeDelay } = defineProps<{
  openDelay?: number
  closeDelay?: number
}>()
</script>

<template>
  <HoverCard.Root :delay="openDelay" :close-delay="closeDelay" v-bind="$attrs">
    <slot />
  </HoverCard.Root>
</template>
