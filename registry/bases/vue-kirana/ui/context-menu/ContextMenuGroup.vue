<script setup lang="ts">
// A radio item reads the nearest radio group through any group between them, as Base UI's does.
import { ContextMenu } from "@kirana-ui/vue/context-menu"
</script>

<template>
  <ContextMenu.Group data-slot="context-menu-group">
    <slot />
  </ContextMenu.Group>
</template>
