<script setup lang="ts">
import { HoverCardRoot } from "reka-ui"

// It renders no element: what a caller passes (`v-model:open` …) goes to Reka's root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs. -->
  <HoverCardRoot v-bind="$attrs">
    <slot />
  </HoverCardRoot>
</template>
