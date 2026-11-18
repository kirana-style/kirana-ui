<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
</script>

<template>
  <Drawer.Close data-slot="drawer-close">
    <slot />
  </Drawer.Close>
</template>
