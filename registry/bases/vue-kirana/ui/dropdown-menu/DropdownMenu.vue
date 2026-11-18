<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"

// It renders no element: what a caller passes (`v-model:open` …) goes to the root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <Menu.Root v-bind="$attrs">
    <slot />
  </Menu.Root>
</template>
