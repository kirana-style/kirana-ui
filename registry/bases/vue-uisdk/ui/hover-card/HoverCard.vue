<script setup lang="ts">
import { HoverCard } from "@ui-sdk/vue/hover-card"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"

/**
 * Ark UI's hover card root's props on ui-sdk's: `open-delay` and `close-delay` are its `delay` and
 * `closeDelay`. Its popup renders in the body, as Base UI's portal puts it.
 */
const { openDelay, closeDelay } = defineProps<{
  openDelay?: number
  closeDelay?: number
}>()
const open = defineModel<boolean | undefined>("open", { default: undefined })
</script>

<template>
  <HoverCard
    :container="popupContainer()"
    :delay="openDelay"
    :close-delay="closeDelay"
    :open="open"
    @update:open="(value: boolean) => (open = value)"
    v-bind="$attrs"
  >
    <slot />
  </HoverCard>
</template>
