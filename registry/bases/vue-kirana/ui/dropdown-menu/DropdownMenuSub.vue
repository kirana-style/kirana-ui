<script setup lang="ts">
// A submenu is a menu inside the menu: its trigger is an item of the outer one.
import { Menu } from "@kirana-ui/vue/menu"

// It renders no element: what a caller passes (`v-model:open` …) goes to the submenu's root.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <Menu.SubmenuRoot v-bind="$attrs">
    <slot />
  </Menu.SubmenuRoot>
</template>
