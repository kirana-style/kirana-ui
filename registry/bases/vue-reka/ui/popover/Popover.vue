<script setup lang="ts">
import { PopoverRoot } from "reka-ui"

// It renders no element: what a caller passes (`v-model:open` …) goes to Reka's root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs. -->
  <PopoverRoot v-bind="$attrs">
    <slot />
  </PopoverRoot>
</template>
