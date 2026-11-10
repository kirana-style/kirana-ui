<script setup lang="ts">
import { TooltipProvider, TooltipRoot } from "reka-ui"

// It renders no element: what a caller passes (`v-model:open` …) goes to Reka's root.
defineOptions({ inheritAttrs: false })

// Opens at once, as shadcn/ui's `TooltipProvider` (`delay = 0`) does. Reka's root needs a provider,
// which Base UI's does not, so each tooltip brings its own.
const { openDelay = 0 } = defineProps<{ openDelay?: number }>()
</script>

<template>
  <TooltipProvider :delay-duration="openDelay">
    <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs. -->
    <TooltipRoot v-bind="$attrs">
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
