<script setup lang="ts">
import { MenuItemGroup } from "@ark-ui/vue"
</script>

<template>
  <MenuItemGroup data-slot="context-menu-group">
    <slot />
  </MenuItemGroup>
</template>
