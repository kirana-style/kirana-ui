<script setup lang="ts">
import { MenuTrigger } from "@ark-ui/vue"
</script>

<template>
  <MenuTrigger data-slot="dropdown-menu-trigger">
    <slot />
  </MenuTrigger>
</template>
