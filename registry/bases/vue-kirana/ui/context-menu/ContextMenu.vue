<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"

// It renders no element: what a caller passes (`v-model:open` …) goes to the root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <ContextMenu.Root v-bind="$attrs">
    <slot />
  </ContextMenu.Root>
</template>
