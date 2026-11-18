<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"
</script>

<template>
  <Menu.Trigger data-slot="dropdown-menu-trigger">
    <slot />
  </Menu.Trigger>
</template>
