<script setup lang="ts">
// A submenu is a menu inside the menu: its trigger is an item of the outer one.
import { ContextMenu } from "@kirana-ui/vue/context-menu"

// It renders no element: what a caller passes (`v-model:open` …) goes to the submenu's root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <ContextMenu.SubmenuRoot v-bind="$attrs">
    <slot />
  </ContextMenu.SubmenuRoot>
</template>
