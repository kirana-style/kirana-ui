<script setup lang="ts">
// A submenu is a menu inside the menu: its trigger is an item of the outer one.
import { MenuRoot } from "@ark-ui/vue"
</script>

<template>
  <MenuRoot>
    <slot />
  </MenuRoot>
</template>
