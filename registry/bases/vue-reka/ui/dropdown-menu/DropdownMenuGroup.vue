<script setup lang="ts">
// A radio item reads the nearest radio group through any group between them, as Base UI's does.
import { DropdownMenuGroup } from "reka-ui"
</script>

<template>
  <DropdownMenuGroup data-slot="dropdown-menu-group">
    <slot />
  </DropdownMenuGroup>
</template>
