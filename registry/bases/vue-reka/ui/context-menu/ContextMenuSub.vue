<script setup lang="ts">
// A submenu is a menu inside the menu: its trigger is an item of the outer one.
import { ContextMenuSub } from "reka-ui"

// It renders no element: what a caller passes (`v-model:open` …) goes to Reka's sub.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Reka keeps it while its exit runs. -->
  <ContextMenuSub v-bind="$attrs">
    <slot />
  </ContextMenuSub>
</template>
