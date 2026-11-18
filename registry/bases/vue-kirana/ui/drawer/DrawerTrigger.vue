<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
</script>

<template>
  <Drawer.Trigger data-slot="drawer-trigger">
    <slot />
  </Drawer.Trigger>
</template>
