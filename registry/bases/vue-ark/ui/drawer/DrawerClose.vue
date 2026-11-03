<script setup lang="ts">
import { DrawerCloseTrigger } from "@ark-ui/vue"
</script>

<template>
  <DrawerCloseTrigger data-slot="drawer-close">
    <slot />
  </DrawerCloseTrigger>
</template>
