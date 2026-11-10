<script setup lang="ts">
// A radio item reads the nearest radio group through any group between them, as Base UI's does.
import { ContextMenuGroup } from "reka-ui"
</script>

<template>
  <ContextMenuGroup data-slot="context-menu-group">
    <slot />
  </ContextMenuGroup>
</template>
