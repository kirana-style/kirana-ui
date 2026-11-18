<script setup lang="ts">
import { Tooltip } from "@kirana-ui/vue/tooltip"

defineOptions({ inheritAttrs: false })

/** Vue's Ark UI parts' `open-delay`, the root's `delay`: 0, as upstream's site wraps every page. */
const { openDelay = 0 } = defineProps<{ openDelay?: number }>()
</script>

<template>
  <Tooltip.Root :delay="openDelay" v-bind="$attrs">
    <slot />
  </Tooltip.Root>
</template>
