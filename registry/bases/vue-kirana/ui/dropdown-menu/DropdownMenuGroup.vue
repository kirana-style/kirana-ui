<script setup lang="ts">
// A radio item reads the nearest radio group through any group between them, as Base UI's does.
import { Menu } from "@kirana-ui/vue/menu"
</script>

<template>
  <Menu.Group data-slot="dropdown-menu-group">
    <slot />
  </Menu.Group>
</template>
